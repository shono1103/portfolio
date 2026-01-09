#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:8001}"

echo "== nginx root =="
curl -fsS -o /dev/null -w "HTTP %{http_code}\n" "${BASE_URL}/" || echo "request failed"

echo "== backend proxy (/backend) =="
curl -fsS -o /dev/null -w "HTTP %{http_code}\n" "${BASE_URL}/backend/health" || echo "request failed"

echo "== tcp port (nginx) =="
if command -v nc >/dev/null 2>&1; then
  nc -zv localhost 8001
else
  echo "nc not found; skip tcp check"
fi
