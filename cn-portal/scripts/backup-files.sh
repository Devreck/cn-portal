#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="$ROOT_DIR/backups"
STAMP="$(date +"%Y%m%d-%H%M%S")"
OUT="$BACKUP_DIR/cn-portal-files-$STAMP.tar.gz"

mkdir -p "$BACKUP_DIR"

tar \
  --exclude='./backups' \
  --exclude='./.git' \
  --exclude='./node_modules' \
  --exclude='./supabase/.temp' \
  -czf "$OUT" \
  -C "$ROOT_DIR" .

echo "$OUT"
