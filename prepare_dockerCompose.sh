#!/usr/bin/env bash
set -euo pipefail

BASE_DIR=$(pwd)

cd "$BASE_DIR/frontend"
docker compose run --rm portfolio-frontend-build

cd "$BASE_DIR/backend"
docker build \
	-t portfolio-backend:latest \
	-f ./Dockerfile .
