#!/bin/bash
set -e

#=============================================================
#  Place of Beauty — Обновление сайта
#  Скачивает последние изменения и пересобирает
#  Запуск: bash update.sh
#=============================================================

APP_DIR="/var/www/placeof.beauty"
BRANCH="claude/analyze-website-wPKSe"

GREEN='\033[0;32m'
NC='\033[0m'
log() { echo -e "${GREEN}[✓]${NC} $1"; }

echo ""
echo "==========================================="
echo "  Place of Beauty — Update"
echo "==========================================="
echo ""

cd "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" 2>/dev/null || true

# Pull latest
log "Загрузка обновлений..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Update backend deps
log "Обновление бэкенда..."
cd "$APP_DIR/backend"
source venv/bin/activate
pip install --upgrade pip > /dev/null 2>&1
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

# Rebuild frontend
log "Пересборка фронтенда..."
cd "$APP_DIR/frontend"
yarn install --frozen-lockfile 2>/dev/null || yarn install
yarn build

# Fix permissions & restart
chown -R www-data:www-data "$APP_DIR"
systemctl restart placeofbeauty
systemctl reload nginx

log "Готово! Сайт обновлён."
echo ""
