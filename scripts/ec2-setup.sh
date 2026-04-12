#!/bin/bash
# One-shot setup + deploy for the commerce app on a fresh Ubuntu VPS.
#
# Usage (from the repo root):
#   bash scripts/ec2-setup.sh           # install everything, build, start
#   bash scripts/ec2-setup.sh deploy    # pull + rebuild + restart (for updates)
#
# Before running: create .env.production in the repo root with your Shopify keys.

set -euo pipefail

APP_NAME="commerce"
APP_PORT="3000"
DOMAIN="nullbyte.in"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

log() { printf "\n\033[1;34m==>\033[0m %s\n" "$*"; }

install_deps() {
  log "Updating system"
  sudo apt update && sudo apt upgrade -y

  log "Installing base packages"
  sudo apt install -y curl git build-essential nginx certbot python3-certbot-nginx ufw

  if ! command -v node >/dev/null 2>&1; then
    log "Installing Node.js 20"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
  fi

  command -v pnpm >/dev/null 2>&1 || { log "Installing pnpm"; sudo npm install -g pnpm; }
  command -v pm2  >/dev/null 2>&1 || { log "Installing pm2";  sudo npm install -g pm2; }

  log "Configuring firewall"
  sudo ufw allow OpenSSH
  sudo ufw allow 'Nginx Full'
  sudo ufw --force enable
}

setup_nginx() {
  log "Writing nginx config for $DOMAIN"
  sudo tee /etc/nginx/sites-available/$APP_NAME >/dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

  sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/$APP_NAME
  sudo rm -f /etc/nginx/sites-enabled/default
  sudo nginx -t
  sudo systemctl restart nginx
}

build_and_run() {
  cd "$REPO_DIR"

  if [[ ! -f .env.production ]]; then
    echo "ERROR: .env.production not found in $REPO_DIR"
    echo "Create it with COMPANY_NAME, SITE_NAME, SHOPIFY_* keys, then re-run."
    exit 1
  fi

  log "Pulling latest"
  git fetch --all --prune
  git reset --hard "@{upstream}" || true

  log "Installing dependencies"
  pnpm install --frozen-lockfile

  log "Building Next.js"
  pnpm build

  if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    log "Restarting pm2 app"
    pm2 restart "$APP_NAME" --update-env
  else
    log "Starting pm2 app"
    pm2 start pnpm --name "$APP_NAME" --cwd "$REPO_DIR" -- start -- -p "$APP_PORT"
    sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$USER" --hp "$HOME" || true
  fi

  pm2 save
  pm2 status
}

main() {
  local action="${1:-all}"
  case "$action" in
    all)
      install_deps
      setup_nginx
      build_and_run
      log "Done. App running at http://$DOMAIN"
      log "Next: point DNS to this VPS, then run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
      ;;
    deploy) build_and_run ;;
    logs)   pm2 logs "$APP_NAME" ;;
    status) pm2 status ;;
    *) echo "Usage: $0 {all|deploy|logs|status}"; exit 1 ;;
  esac
}

main "$@"
