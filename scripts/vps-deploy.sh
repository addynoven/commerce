#!/bin/bash
# Pull the latest Docker image and restart the container on the VPS.
# Run ON the VPS: bash scripts/vps-deploy.sh
#
# Requires:
#   - Docker installed (run scripts/ec2-setup.sh first if not)
#   - .env.production in $HOME with runtime env vars
#   - Image already pushed via scripts/docker-push.sh

set -euo pipefail

IMAGE="${DOCKER_IMAGE:-neonstain/aarshaveda-commerce}"
TAG="${TAG:-latest}"
CONTAINER="commerce"
PORT="${PORT:-3000}"
ENV_FILE="${ENV_FILE:-$HOME/.env.production}"

log() { printf "\n\033[1;34m==>\033[0m %s\n" "$*"; }

# ── Validate ──────────────────────────────────────────────────────────────────

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: $ENV_FILE not found."
  echo "Create it on the VPS with your Shopify env vars (see .env.example in the repo)."
  exit 1
fi

# ── Deploy ────────────────────────────────────────────────────────────────────

log "Pulling $IMAGE:$TAG"
docker pull "$IMAGE:$TAG"

log "Stopping old container (if running)"
docker stop "$CONTAINER" 2>/dev/null || true
docker rm   "$CONTAINER" 2>/dev/null || true

log "Starting $CONTAINER"
docker run -d \
  --name "$CONTAINER" \
  --restart unless-stopped \
  -p "$PORT:3000" \
  --env-file "$ENV_FILE" \
  "$IMAGE:$TAG"

log "Pruning unused images"
docker image prune -f

log "Done — container is running"
docker ps --filter "name=$CONTAINER" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
