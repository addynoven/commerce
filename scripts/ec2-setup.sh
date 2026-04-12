#!/bin/bash
# Manual CI/CD helper for the commerce app on an EC2 Ubuntu box.
#
# Usage (from the repo root on the VPS):
#   bash scripts/ec2-setup.sh setup     # one-time: install deps, nginx, pm2, firewall
#   bash scripts/ec2-setup.sh deploy    # after `git push`: pull, build, restart pm2
#   bash scripts/ec2-setup.sh logs      # tail pm2 logs
#   bash scripts/ec2-setup.sh status    # pm2 status
#
# If no command is given and the pm2 app already exists, it runs `deploy`.
# Otherwise it runs `setup`.

set -euo pipefail

APP_NAME="commerce"
APP_PORT="${APP_PORT:-3000}"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NODE_MAJOR="20"

log()  { printf "\n\033[1;34m==>\033[0m %s\n" "$*"; }
warn() { printf "\n\033[1;33m!! \033[0m %s\n" "$*"; }

cmd_setup() {
  log "Updating system"
  sudo apt update && sudo apt upgrade -y

  log "Installing base packages"
  sudo apt install -y curl git build-essential nginx certbot python3-certbot-nginx ufw

  if ! command -v node >/dev/null 2>&1; then
    log "Installing Node.js ${NODE_MAJOR}.x"
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
    sudo apt install -y nodejs
  fi

  if ! command -v pnpm >/dev/null 2>&1; then
    log "Installing pnpm"
    sudo npm install -g pnpm
  fi

  if ! command -v pm2 >/dev/null 2>&1; then
    log "Installing pm2"
    sudo npm install -g pm2
  fi

  log "Configuring firewall"
  sudo ufw allow OpenSSH
  sudo ufw allow 'Nginx Full'
  sudo ufw --force enable

  log "Enabling pm2 startup on boot"
  sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$USER" --hp "$HOME" || true

  cat <<EOF

Setup complete.

Next steps:
  1. Create $REPO_DIR/.env.production with:
       COMPANY_NAME=...
       SITE_NAME=...
       SHOPIFY_REVALIDATION_SECRET=...
       SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
       SHOPIFY_STORE_DOMAIN=...

  2. Wire up nginx:
       sudo cp $REPO_DIR/nginx.conf /etc/nginx/sites-available/$APP_NAME
       sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/$APP_NAME
       sudo rm -f /etc/nginx/sites-enabled/default
       sudo nginx -t && sudo systemctl restart nginx

  3. SSL (after DNS is pointed here):
       sudo certbot --nginx -d your-domain.com -d www.your-domain.com

  4. First deploy:
       bash scripts/ec2-setup.sh deploy
EOF
}

cmd_deploy() {
  cd "$REPO_DIR"

  log "Pulling latest from git"
  git fetch --all --prune
  git reset --hard "@{upstream}"

  log "Installing dependencies (frozen lockfile)"
  pnpm install --frozen-lockfile

  log "Building Next.js"
  pnpm build

  if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    log "Restarting pm2 app: $APP_NAME"
    pm2 stop "$APP_NAME" || true
    pm2 delete "$APP_NAME" || true
  else
    log "Starting pm2 app: $APP_NAME (first run)"
  fi

  pm2 start "pnpm" --name "$APP_NAME" --cwd "$REPO_DIR" \
    --update-env \
    -- start -- -p "$APP_PORT"

  pm2 save
  log "Deploy done"
  pm2 status
}

cmd_logs()   { pm2 logs "$APP_NAME"; }
cmd_status() { pm2 status; }

main() {
  local action="${1:-}"
  if [[ -z "$action" ]]; then
    if command -v pm2 >/dev/null 2>&1 && pm2 describe "$APP_NAME" >/dev/null 2>&1; then
      action="deploy"
    else
      action="setup"
    fi
    warn "No command given — running: $action"
  fi

  case "$action" in
    setup)  cmd_setup ;;
    deploy) cmd_deploy ;;
    logs)   cmd_logs ;;
    status) cmd_status ;;
    *) echo "Usage: $0 {setup|deploy|logs|status}"; exit 1 ;;
  esac
}

main "$@"
