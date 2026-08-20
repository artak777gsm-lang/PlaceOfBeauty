#!/bin/bash
set -e

#=============================================================
#  Place of Beauty — Автоматический деплой
#  Домен: placeof.beauty
#  Запуск: bash deploy.sh
#=============================================================

DOMAIN="placeof.beauty"
APP_DIR="/var/www/placeof.beauty"
REPO_URL="https://github.com/artak777gsm-lang/PlaceOfBeauty.git"
BRANCH="main"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

echo ""
echo "==========================================="
echo "  Place of Beauty — Deploy Script"
echo "  Domain: $DOMAIN"
echo "==========================================="
echo ""

#--- 1. Проверка root ---
if [ "$EUID" -ne 0 ]; then
  err "Запустите скрипт от root: sudo bash deploy.sh"
fi

#--- 2. Обновление системы ---
log "Обновление пакетов..."
apt update -qq
apt upgrade -y -qq

#--- 3. Установка зависимостей ---
log "Установка nginx, certbot, python, git..."
apt install -y -qq nginx certbot python3-certbot-nginx python3-pip python3-venv git curl gnupg

#--- 4. Node.js 20 ---
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d v) -lt 18 ]]; then
  log "Установка Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
  apt install -y -qq nodejs
else
  log "Node.js уже установлен: $(node -v)"
fi

if ! command -v yarn &> /dev/null; then
  log "Установка Yarn..."
  npm install -g yarn > /dev/null 2>&1
else
  log "Yarn уже установлен"
fi

#--- 5. MongoDB ---
if ! command -v mongod &> /dev/null; then
  log "Установка MongoDB 7.0..."
  curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg 2>/dev/null

  # Определяем кодовое имя Ubuntu
  UBUNTU_CODENAME=$(lsb_release -cs)
  # MongoDB поддерживает jammy (22.04) и focal (20.04). Для более новых используем jammy
  if [[ "$UBUNTU_CODENAME" != "focal" && "$UBUNTU_CODENAME" != "jammy" ]]; then
    UBUNTU_CODENAME="jammy"
  fi

  echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu ${UBUNTU_CODENAME}/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null
  apt update -qq
  apt install -y -qq mongodb-org
  systemctl start mongod
  systemctl enable mongod
  log "MongoDB установлена и запущена"
else
  log "MongoDB уже установлена"
  systemctl is-active --quiet mongod || systemctl start mongod
fi

#--- 6. Клонирование/обновление проекта ---
if [ -d "$APP_DIR" ]; then
  warn "Директория $APP_DIR уже существует, обновляю..."
  cd "$APP_DIR"
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  log "Клонирование репозитория..."
  mkdir -p /var/www
  git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
fi
cd "$APP_DIR"
log "Проект загружен в $APP_DIR"

#--- 7. Backend ---
log "Настройка бэкенда..."
cd "$APP_DIR/backend"

python3 -m venv venv
source venv/bin/activate

pip install --upgrade pip > /dev/null 2>&1
# Устанавливаем только необходимые пакеты (без emergentintegrations и лишних)
pip install \
  fastapi==0.110.1 \
  uvicorn==0.25.0 \
  python-dotenv \
  pymongo==4.5.0 \
  "pydantic>=2.6.4" \
  motor==3.3.1 \
  email-validator \
  python-multipart > /dev/null 2>&1

deactivate

# .env для бэкенда
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=placeofbeauty
CORS_ORIGINS=https://${DOMAIN},https://www.${DOMAIN}
EOF

log "Бэкенд готов"

#--- 8. Frontend ---
log "Сборка фронтенда (это может занять 2-3 минуты)..."
cd "$APP_DIR/frontend"

cat > .env << EOF
REACT_APP_BACKEND_URL=https://${DOMAIN}
EOF

yarn install --frozen-lockfile 2>/dev/null || yarn install
yarn build

log "Фронтенд собран"

#--- 9. Systemd-сервис ---
log "Создание systemd-сервиса..."

cat > /etc/systemd/system/placeofbeauty.service << EOF
[Unit]
Description=Place of Beauty FastAPI Backend
After=network.target mongod.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=${APP_DIR}/backend
Environment=PATH=${APP_DIR}/backend/venv/bin:/usr/bin
EnvironmentFile=${APP_DIR}/backend/.env
ExecStart=${APP_DIR}/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

chown -R www-data:www-data "$APP_DIR"
systemctl daemon-reload
systemctl enable placeofbeauty
systemctl restart placeofbeauty

log "FastAPI запущен на порту 8000"

#--- 10. Nginx ---
log "Настройка Nginx..."

cat > /etc/nginx/sites-available/${DOMAIN} << 'NGINX_EOF'
server {
    listen 80;
    server_name placeof.beauty www.placeof.beauty;

    root /var/www/placeof.beauty/frontend/build;
    index index.html;

    # Gzip-сжатие
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    # Frontend — React SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 30s;
    }

    # Кэширование статики
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_EOF

ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t || err "Ошибка конфигурации Nginx!"
systemctl reload nginx

log "Nginx настроен"

#--- 11. Проверка ---
echo ""
echo "==========================================="
echo "  Проверка сервисов"
echo "==========================================="

check_service() {
  if systemctl is-active --quiet "$1"; then
    log "$1 — работает"
  else
    warn "$1 — НЕ работает! Проверьте: systemctl status $1"
  fi
}

check_service mongod
check_service placeofbeauty
check_service nginx

# Тест API
sleep 2
API_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/ 2>/dev/null || echo "000")
if [ "$API_RESPONSE" = "200" ]; then
  log "API отвечает (HTTP 200)"
else
  warn "API не отвечает (HTTP $API_RESPONSE). Проверьте: journalctl -u placeofbeauty -n 30"
fi

#--- 12. Финальная информация ---
echo ""
echo "==========================================="
echo "  Деплой завершён!"
echo "==========================================="
echo ""
echo "  Сайт будет доступен по адресу:"
echo "    http://${DOMAIN}"
echo ""
echo "  СЛЕДУЮЩИЙ ШАГ — SSL-сертификат:"
echo "  После того как DNS пропишется (15-60 мин),"
echo "  выполните:"
echo ""
echo "    certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo ""
echo "  Полезные команды:"
echo "    systemctl status placeofbeauty  — статус бэкенда"
echo "    journalctl -u placeofbeauty -f  — логи бэкенда"
echo "    systemctl status nginx          — статус Nginx"
echo "    nginx -t                        — проверка конфига"
echo ""
echo "  НЕ ЗАБУДЬТЕ сменить пароль root:"
echo "    passwd"
echo ""
