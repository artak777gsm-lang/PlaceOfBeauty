#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; }

echo ""
echo "==========================================="
echo "  Place of Beauty — Диагностика и починка"
echo "==========================================="
echo ""

#--- 1. Проверка MongoDB ---
echo "--- MongoDB ---"
if systemctl is-active --quiet mongod; then
  log "MongoDB запущена"
else
  warn "MongoDB не запущена, запускаю..."
  systemctl start mongod
  sleep 2
fi

# Проверяем данные
SERVICES_COUNT=$(mongosh placeofbeauty --quiet --eval "db.services.countDocuments({})" 2>/dev/null || echo "error")
GALLERY_COUNT=$(mongosh placeofbeauty --quiet --eval "db.gallery.countDocuments({})" 2>/dev/null || echo "error")
REVIEWS_COUNT=$(mongosh placeofbeauty --quiet --eval "db.reviews.countDocuments({})" 2>/dev/null || echo "error")
SALON_COUNT=$(mongosh placeofbeauty --quiet --eval "db.salon_info.countDocuments({})" 2>/dev/null || echo "error")

echo "  Services: $SERVICES_COUNT"
echo "  Gallery:  $GALLERY_COUNT"
echo "  Reviews:  $REVIEWS_COUNT"
echo "  Salon:    $SALON_COUNT"

#--- 2. Проверка бэкенда ---
echo ""
echo "--- Backend ---"
if systemctl is-active --quiet placeofbeauty; then
  log "Сервис placeofbeauty запущен"
else
  warn "Сервис placeofbeauty не запущен, запускаю..."
  systemctl restart placeofbeauty
  sleep 3
fi

# Логи бэкенда (последние ошибки)
echo ""
echo "--- Последние логи бэкенда ---"
journalctl -u placeofbeauty -n 20 --no-pager 2>/dev/null || true

#--- 3. Перезапуск бэкенда для пересида ---
echo ""
echo "--- Пересид данных ---"

# Если данных нет — дропнем базу и перезапустим чтобы seed отработал
if [ "$SERVICES_COUNT" = "0" ] || [ "$SERVICES_COUNT" = "error" ] || [ "$GALLERY_COUNT" = "0" ] || [ "$GALLERY_COUNT" = "error" ]; then
  warn "Данные отсутствуют, пересоздаю базу..."
  mongosh placeofbeauty --quiet --eval "db.dropDatabase()" 2>/dev/null || true
  systemctl restart placeofbeauty
  sleep 5

  # Проверяем заново
  SERVICES_COUNT=$(mongosh placeofbeauty --quiet --eval "db.services.countDocuments({})" 2>/dev/null || echo "error")
  GALLERY_COUNT=$(mongosh placeofbeauty --quiet --eval "db.gallery.countDocuments({})" 2>/dev/null || echo "error")
  echo "  Services после пересида: $SERVICES_COUNT"
  echo "  Gallery после пересида:  $GALLERY_COUNT"
fi

#--- 4. Тест API ---
echo ""
echo "--- Тест API ---"
sleep 2

API_ROOT=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/ 2>/dev/null || echo "000")
API_SERVICES=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/services 2>/dev/null || echo "000")
API_GALLERY=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/gallery 2>/dev/null || echo "000")
API_REVIEWS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/reviews 2>/dev/null || echo "000")

echo "  /api/          -> HTTP $API_ROOT"
echo "  /api/services  -> HTTP $API_SERVICES"
echo "  /api/gallery   -> HTTP $API_GALLERY"
echo "  /api/reviews   -> HTTP $API_REVIEWS"

if [ "$API_SERVICES" = "200" ] && [ "$API_GALLERY" = "200" ]; then
  log "API работает корректно!"
else
  err "API всё ещё не работает. Пробую переустановить зависимости бэкенда..."

  cd /var/www/placeof.beauty/backend
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
    python-multipart 2>&1
  deactivate

  chown -R www-data:www-data /var/www/placeof.beauty
  systemctl restart placeofbeauty
  sleep 5

  API_SERVICES=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/services 2>/dev/null || echo "000")
  API_GALLERY=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/gallery 2>/dev/null || echo "000")
  echo ""
  echo "  /api/services  -> HTTP $API_SERVICES"
  echo "  /api/gallery   -> HTTP $API_GALLERY"

  if [ "$API_SERVICES" = "200" ]; then
    log "API починен!"
  else
    err "Проблема сохраняется. Логи:"
    journalctl -u placeofbeauty -n 30 --no-pager
  fi
fi

#--- 5. Проверка Nginx ---
echo ""
echo "--- Nginx ---"
nginx -t 2>&1
if systemctl is-active --quiet nginx; then
  log "Nginx запущен"
  systemctl reload nginx
else
  systemctl start nginx
fi

#--- 6. Проверка через домен ---
echo ""
echo "--- Итоговая проверка ---"
SITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null || echo "000")
echo "  http://localhost/ -> HTTP $SITE_STATUS"

echo ""
echo "==========================================="
echo "  Диагностика завершена"
echo "==========================================="
echo ""
