#!/bin/bash
# Build the Docker image locally and push to Docker Hub.
# Run from the repo root: bash scripts/docker-push.sh
#
# Requires:
#   - Docker running locally
#   - `docker login` already done
#   - .env file in repo root with all Shopify vars
#
# Usage:
#   bash scripts/docker-push.sh                    # build + push :latest
#   TAG=v1.2.3 bash scripts/docker-push.sh         # build + push :v1.2.3 AND :latest

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${DOCKER_IMAGE:-neonstain/aarshaveda-commerce}"
TAG="${TAG:-latest}"
ENV_FILE="${ENV_FILE:-$REPO_DIR/.env}"

log() { printf "\n\033[1;34m==>\033[0m %s\n" "$*"; }

# ── Validate ──────────────────────────────────────────────────────────────────

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: $ENV_FILE not found."
  echo "Create it (copy .env.example) with your Shopify keys, then re-run."
  exit 1
fi

# ── Load env vars ─────────────────────────────────────────────────────────────

# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

: "${COMPANY_NAME:?COMPANY_NAME must be set in $ENV_FILE}"
: "${SITE_NAME:?SITE_NAME must be set in $ENV_FILE}"
: "${SHOPIFY_REVALIDATION_SECRET:?SHOPIFY_REVALIDATION_SECRET must be set in $ENV_FILE}"
: "${SHOPIFY_STOREFRONT_ACCESS_TOKEN:?SHOPIFY_STOREFRONT_ACCESS_TOKEN must be set in $ENV_FILE}"
: "${SHOPIFY_STORE_DOMAIN:?SHOPIFY_STORE_DOMAIN must be set in $ENV_FILE}"

# ── Build ─────────────────────────────────────────────────────────────────────

log "Building $IMAGE:$TAG"

docker build \
  --build-arg COMPANY_NAME="$COMPANY_NAME" \
  --build-arg SITE_NAME="$SITE_NAME" \
  --build-arg SHOPIFY_REVALIDATION_SECRET="$SHOPIFY_REVALIDATION_SECRET" \
  --build-arg SHOPIFY_STOREFRONT_ACCESS_TOKEN="$SHOPIFY_STOREFRONT_ACCESS_TOKEN" \
  --build-arg SHOPIFY_STORE_DOMAIN="$SHOPIFY_STORE_DOMAIN" \
  -t "$IMAGE:$TAG" \
  "$REPO_DIR"

# Also tag as :latest when pushing a versioned tag
if [[ "$TAG" != "latest" ]]; then
  docker tag "$IMAGE:$TAG" "$IMAGE:latest"
fi

# ── Push ──────────────────────────────────────────────────────────────────────

log "Pushing $IMAGE:$TAG"
docker push "$IMAGE:$TAG"

if [[ "$TAG" != "latest" ]]; then
  log "Pushing $IMAGE:latest"
  docker push "$IMAGE:latest"
fi

log "Done — $IMAGE:$TAG is live on Docker Hub"
log "Deploy on VPS: bash scripts/vps-deploy.sh"
