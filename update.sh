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

# Fix permissions & restart
chown -R www-data:www-data "$APP_DIR"
systemctl restart placeofbeauty
systemctl reload nginx

log "Готово! Сайт обновлён."
echo ""
