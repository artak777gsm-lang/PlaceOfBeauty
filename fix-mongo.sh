#!/bin/bash
set -e

#=============================================================
#  Place of Beauty — Fix MongoDB Auto-Restart
#  Ensures mongod always restarts and app follows
#  Run: sudo bash fix-mongo.sh
#=============================================================

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

echo ""
echo "==========================================="
echo "  Place of Beauty — Fix MongoDB Restart"
echo "==========================================="
echo ""

#--- Check root ---
if [ "$EUID" -ne 0 ]; then
  err "Run as root: sudo bash fix-mongo.sh"
fi

#--- 1. Systemd override for mongod: always restart ---
log "Creating systemd override for mongod..."
mkdir -p /etc/systemd/system/mongod.service.d
cat > /etc/systemd/system/mongod.service.d/restart.conf << 'EOF'
[Service]
Restart=always
RestartSec=5
EOF
log "mongod will now always restart (5s delay)"

#--- 2. Update placeofbeauty.service to depend on mongod ---
log "Updating placeofbeauty.service..."

SERVICE_FILE="/etc/systemd/system/placeofbeauty.service"

if [ ! -f "$SERVICE_FILE" ]; then
  err "placeofbeauty.service not found at $SERVICE_FILE"
fi

# Update [Unit] section: add Requires and PartOf, fix After
sed -i '/^Requires=mongod.service$/d' "$SERVICE_FILE"
sed -i '/^PartOf=mongod.service$/d' "$SERVICE_FILE"

# Add Requires and PartOf after [Unit]
sed -i '/^\[Unit\]/a Requires=mongod.service' "$SERVICE_FILE"
sed -i '/^Requires=mongod.service$/a PartOf=mongod.service' "$SERVICE_FILE"

# Update After to include mongod.service
sed -i 's/^After=.*/After=network.target mongod.service/' "$SERVICE_FILE"

log "placeofbeauty.service now requires and follows mongod"

#--- 3. Reload and restart ---
log "Reloading systemd daemon..."
systemctl daemon-reload

log "Restarting mongod..."
systemctl restart mongod

log "Restarting placeofbeauty..."
systemctl restart placeofbeauty

#--- 4. Status check ---
echo ""
echo "==========================================="
echo "  Service Status"
echo "==========================================="

check_service() {
  if systemctl is-active --quiet "$1"; then
    log "$1 — running"
  else
    warn "$1 — NOT running! Check: systemctl status $1"
  fi
}

check_service mongod
check_service placeofbeauty

echo ""
log "Done! MongoDB and placeofbeauty are linked."
echo "  If mongod restarts, placeofbeauty will follow."
echo ""
