#!/bin/bash
set -e

# Всё тело — в фигурных скобках, и выход внутри них: bash читает составную
# команду целиком до выполнения. Без этого `git pull` ниже подменяет этот же
# файл посреди работы, bash дочитывает его уже новым с прежнего смещения, и
# часть шагов выполняет старая версия скрипта — так 14.10 конфиг nginx
# записался без нового редиректа при «успешном» выкате.
{

#=============================================================
#  Place of Beauty — Обновление сайта
#  Скачивает последние изменения и пересобирает
#  Запуск: bash update.sh
#=============================================================

APP_DIR="/var/www/placeof.beauty"
BRANCH="main"

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

# Ensure persistent uploads directory exists (survives rebuilds)
mkdir -p "$APP_DIR/uploads"

# Migrate any existing uploads from old location (build/gallery) to new persistent location
if [ -d "$APP_DIR/frontend/build/gallery" ]; then
  # Only copy files with UUID-style names (32 hex chars) — these are user uploads
  find "$APP_DIR/frontend/build/gallery" -maxdepth 1 -type f -regextype posix-extended \
    -regex '.*/[0-9a-f]{32}\.(jpg|jpeg|png|webp|gif)$' \
    -exec cp -n {} "$APP_DIR/uploads/" \; 2>/dev/null || true
fi

# Pull latest
log "Загрузка обновлений..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Без ADMIN_PASS бэкенд держит админку закрытой (пароля по умолчанию в коде
# нет — репозиторий публичный). Само значение скрипт не трогает и не печатает.
if ! grep -q '^ADMIN_PASS=.' "$APP_DIR/backend/.env" 2>/dev/null; then
  echo -e "\033[0;33m[!]\033[0m В backend/.env нет ADMIN_PASS — панель /admin будет закрыта, пока его не задать."
fi

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

# Generate favicon PNGs from SVG (if tools available)
log "Генерация favicon..."
BUILD_DIR="$APP_DIR/frontend/build"
if command -v rsvg-convert &> /dev/null; then
  rsvg-convert -w 32 -h 32 "$BUILD_DIR/favicon.svg" > "$BUILD_DIR/favicon-32x32.png" 2>/dev/null || true
  rsvg-convert -w 180 -h 180 "$BUILD_DIR/favicon.svg" > "$BUILD_DIR/apple-touch-icon.png" 2>/dev/null || true
elif command -v convert &> /dev/null; then
  convert -background none -resize 32x32 "$BUILD_DIR/favicon.svg" "$BUILD_DIR/favicon-32x32.png" 2>/dev/null || true
  convert -background none -resize 180x180 "$BUILD_DIR/favicon.svg" "$BUILD_DIR/apple-touch-icon.png" 2>/dev/null || true
else
  apt install -y -qq librsvg2-bin 2>/dev/null || true
  if command -v rsvg-convert &> /dev/null; then
    rsvg-convert -w 32 -h 32 "$BUILD_DIR/favicon.svg" > "$BUILD_DIR/favicon-32x32.png" 2>/dev/null || true
    rsvg-convert -w 180 -h 180 "$BUILD_DIR/favicon.svg" > "$BUILD_DIR/apple-touch-icon.png" 2>/dev/null || true
  fi
fi

# Update Nginx config for SEO (proper MIME types, better caching)
log "Обновление Nginx конфига для SEO..."

# Заголовки безопасности — в отдельном файле, который подключается в КАЖДОМ
# location с собственным add_header: nginx не наследует add_header с уровня
# server в location, где есть свой add_header. До 04.11 из-за этого ни один
# ответ не нёс X-Frame-Options / nosniff / Referrer-Policy.
mkdir -p /etc/nginx/snippets
cat > /etc/nginx/snippets/placeof-headers.conf << 'HEADERS_EOF'
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self)" always;
add_header Strict-Transport-Security "max-age=31536000" always;
HEADERS_EOF

cat > /etc/nginx/sites-available/placeof.beauty << 'NGINX_EOF'
# /index.html и /<маршрут>/index.html → канонический адрес без index.html.
# Смотрим $request_uri (исходный запрос), чтобы не поймать внутренние
# переходы try_files.
map $request_uri $pob_index_redirect {
    ~^/index\.html(?:\?.*)?$               /;
    ~^(?<pob_p>/.+)/index\.html(?:\?.*)?$  $pob_p;
    default                                "";
}

server {
    listen 80;
    server_name placeof.beauty www.placeof.beauty;
    return 301 https://placeof.beauty$request_uri;
}

# www → основной домен (сертификат покрывает оба имени). До 04.11 www отдавал
# тот же сайт с кодом 200 — второй хост с той же самой выдачей.
server {
    listen 443 ssl http2;
    server_name www.placeof.beauty;
    ssl_certificate /etc/letsencrypt/live/placeof.beauty/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/placeof.beauty/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    return 301 https://placeof.beauty$request_uri;
}

server {
    listen 443 ssl http2;
    server_name placeof.beauty;

    ssl_certificate /etc/letsencrypt/live/placeof.beauty/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/placeof.beauty/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/placeof.beauty/frontend/build;
    index index.html;

    # Польские буквы в llms.txt, robots.txt, JSON и XML.
    charset utf-8;
    charset_types text/plain text/css text/xml application/javascript application/json application/xml application/manifest+json;

    include /etc/nginx/snippets/placeof-headers.conf;

    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_comp_level 6;
    gzip_types
        text/plain text/css text/xml text/javascript
        application/json application/javascript application/xml application/ld+json
        application/rss+xml application/atom+xml
        image/svg+xml application/manifest+json;

    if ($pob_index_redirect) {
        return 301 $pob_index_redirect;
    }

    # Настоящий 404. Раньше любой неизвестный адрес (опечатка, /llms.txt,
    # /uslugi/nieistnieje) получал главную с кодом 200 — мягкий 404 и дубль
    # главной. 404.html пишет пререндер (страница «Nie znaleziono», noindex).
    error_page 404 /404.html;
    location = /404.html {
        internal;
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "no-cache" always;
        add_header X-Robots-Tag "noindex" always;
    }

    # --- файлы для краулеров и AI-агентов -----------------------------------
    location = /robots.txt {
        access_log off;
        try_files $uri =404;
    }
    location = /sitemap.xml {
        types { application/xml xml; }
        access_log off;
        try_files $uri =404;
    }
    location = /manifest.json {
        types { application/manifest+json json; }
        try_files $uri =404;
    }
    # llms.txt и llms-full.txt генерирует пререндер при каждой сборке.
    location ~ ^/llms(-full)?\.txt$ {
        types { text/plain txt; }
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "no-cache" always;
        try_files $uri =404;
    }
    # ACME и security.txt — раньше блокировки файлов с точкой.
    location ^~ /.well-known/ {
        try_files $uri =404;
    }

    # --- редиректы ----------------------------------------------------------
    # Zabiegów na twarz salon nie wykonuje — dawna strona prowadzi do cennika,
    # zamiast obiecywać usługę, której nie ma.
    location ~ ^/uslugi/zabiegi-na-twarz/?$ {
        return 301 /uslugi;
    }
    # /uslugi/ → /uslugi: sitemap и canonical без слеша. Префиксы, у которых
    # слеш бывает законно (/api/, /static/, …), объявлены через ^~, и этот
    # regex до них не доходит.
    location ~ ^(?<pob_noslash>/.+)/$ {
        return 301 $pob_noslash$is_args$args;
    }

    # --- приложение ---------------------------------------------------------
    # Админка — чистая оболочка SPA (не пререндер главной) и вне индекса.
    location ^~ /admin {
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "no-store" always;
        add_header X-Robots-Tag "noindex, nofollow" always;
        try_files /app-shell.html =404;
    }

    # Главная + ссылка на llms.txt в заголовке ответа.
    location = / {
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "no-cache" always;
        add_header Link '</llms.txt>; rel="alternate"; type="text/plain"' always;
        try_files /index.html =404;
    }

    location / {
        # $uri/index.html проверяется ПЕРВЫМ. Если первым идёт $uri, nginx
        # находит созданный пререндером каталог и сам отвечает 301 с дописанным
        # слешем — а все URL в sitemap.xml и все canonical идут без слеша, то
        # есть редирект получала бы каждая проиндексированная страница.
        # В конце =404, а не /index.html: пререндер кладёт файл (или копию
        # оболочки, если рендер не удался) для каждого маршрута из sitemap.
        try_files $uri/index.html $uri =404;
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "no-cache" always;
    }

    # Backend API. В robots.txt не закрыт — рендереру Google нужен прайс, —
    # но сами JSON в индекс попадать не должны.
    location ^~ /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 30s;
        client_max_body_size 10M;
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header X-Robots-Tag "noindex" always;
    }

    # Бандлы CRA с хешем в имени — год, immutable. ^~, иначе regex ниже
    # перехватывает .js/.css и даёт 30 дней.
    location ^~ /static/ {
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        access_log off;
        try_files $uri =404;
    }

    # Gallery images (built-in)
    location ^~ /gallery/ {
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "public, max-age=2592000" always;
        access_log off;
        try_files $uri =404;
    }

    # User-uploaded images (persistent — survives rebuilds)
    location ^~ /uploads/ {
        alias /var/www/placeof.beauty/uploads/;
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "public, max-age=2592000" always;
        access_log off;
    }

    # Остальная статика из корня (favicon, og-image, logo, apple-touch-icon).
    location ~* \.(png|jpe?g|gif|ico|svg|webp|avif|woff2?|ttf|eot)$ {
        include /etc/nginx/snippets/placeof-headers.conf;
        add_header Cache-Control "public, max-age=2592000" always;
        access_log off;
        try_files $uri =404;
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_EOF

# sites-enabled должен быть симлинком. Если там лежит обычный файл — копия,
# сделанная когда-то вручную, — nginx читает её, а всё, что скрипт выше записал
# в sites-available, не действует и расхождение ничем себя не выдаёт.
ln -sf /etc/nginx/sites-available/placeof.beauty /etc/nginx/sites-enabled/placeof.beauty

nginx -t && systemctl reload nginx

# Migrate DB references from /gallery/UUID.jpg to /uploads/UUID.jpg for user uploads
log "Миграция путей пользовательских изображений в БД..."
mongosh placeofbeauty --quiet --eval '
  // Find all user-uploaded images (32-char hex UUID) and move their URLs to /uploads/
  db.homepage.find({}).forEach(function(doc) {
    var changed = false;
    if (doc.hero_image && /^\/gallery\/[0-9a-f]{32}\.(jpg|jpeg|png|webp|gif)$/.test(doc.hero_image)) {
      doc.hero_image = doc.hero_image.replace("/gallery/", "/uploads/");
      changed = true;
    }
    if (doc.cta_image && /^\/gallery\/[0-9a-f]{32}\.(jpg|jpeg|png|webp|gif)$/.test(doc.cta_image)) {
      doc.cta_image = doc.cta_image.replace("/gallery/", "/uploads/");
      changed = true;
    }
    if (changed) {
      db.homepage.replaceOne({_id: doc._id}, doc);
    }
  });
  db.gallery.find({}).forEach(function(doc) {
    if (doc.url && /^\/gallery\/[0-9a-f]{32}\.(jpg|jpeg|png|webp|gif)$/.test(doc.url)) {
      doc.url = doc.url.replace("/gallery/", "/uploads/");
      db.gallery.replaceOne({_id: doc._id}, doc);
    }
  });
' 2>/dev/null || true

# Fix permissions & restart
chown -R www-data:www-data "$APP_DIR"
chown -R www-data:www-data "$APP_DIR/uploads"
systemctl restart placeofbeauty
systemctl reload nginx

log "Готово! Сайт обновлён."
log "Пользовательские фото сохранены в $APP_DIR/uploads/"
echo ""
exit 0
}
