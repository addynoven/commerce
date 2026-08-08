#!/bin/bash
# One-shot setup for the commerce app on a fresh Ubuntu VPS.
# The app runs from a pre-built Docker image — no build happens on this machine.
#
# Workflow:
#   1. Locally:  bash scripts/docker-push.sh       # build + push image to Docker Hub
#   2. On VPS:   bash scripts/ec2-setup.sh         # install Docker + nginx (first time only)
#   3. On VPS:   bash scripts/vps-deploy.sh        # pull image + start container (every deploy)
#
# Before running setup: create ~/.env.production on the VPS with your Shopify keys.

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
  sudo apt install -y curl git nginx certbot python3-certbot-nginx ufw

  if ! command -v docker >/dev/null 2>&1; then
    log "Installing Docker"
    curl -fsSL https://get.docker.com | sudo sh
    sudo usermod -aG docker "$USER"
    log "Docker installed — you may need to log out and back in for group membership"
  fi

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

start_app() {
  log "Pulling Docker image and starting container"
  bash "$REPO_DIR/scripts/vps-deploy.sh"
}

main() {
  local action="${1:-all}"
  case "$action" in
    all)
      install_deps
      setup_nginx
      start_app
      log "Done. App running at http://$DOMAIN"
      log "Next: point DNS to this VPS, then run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
      ;;
    logs)   docker logs -f commerce ;;
    status) docker ps --filter "name=commerce" ;;
    *) echo "Usage: $0 {all|logs|status}"; exit 1 ;;
  esac
}

main "$@"
