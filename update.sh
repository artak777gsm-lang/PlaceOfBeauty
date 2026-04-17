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
cat > /etc/nginx/sites-available/placeof.beauty << 'NGINX_EOF'
server {
    listen 80;
    server_name placeof.beauty www.placeof.beauty;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name placeof.beauty www.placeof.beauty;

    ssl_certificate /etc/letsencrypt/live/placeof.beauty/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/placeof.beauty/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/placeof.beauty/frontend/build;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self)" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_comp_level 6;
    gzip_types
        text/plain text/css text/xml text/javascript
        application/json application/javascript application/xml+rss
        application/rss+xml application/atom+xml
        image/svg+xml application/manifest+json;

    # SEO files — proper MIME types
    location = /robots.txt {
        add_header Content-Type text/plain;
        access_log off;
    }
    location = /sitemap.xml {
        add_header Content-Type application/xml;
        access_log off;
    }
    location = /manifest.json {
        add_header Content-Type application/manifest+json;
    }

    # Frontend SPA
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 30s;
        client_max_body_size 10M;
    }

    # Long-cache static assets (hashed filenames)
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Gallery images (built-in)
    location /gallery/ {
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # User-uploaded images (persistent — survives rebuilds)
    # ^~ modifier: takes precedence over regex locations (so .jpg/.jpeg rules don't intercept)
    location ^~ /uploads/ {
        alias /var/www/placeof.beauty/uploads/;
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # Other static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff2?|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_EOF

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
