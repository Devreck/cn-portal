#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="$ROOT_DIR/backups"
STAMP="$(date +"%Y%m%d-%H%M%S")"
OUT="$BACKUP_DIR/supabase-db-$STAMP.sql"

mkdir -p "$BACKUP_DIR"

if [[ -n "${SUPABASE_DB_URL:-}" ]]; then
  if ! command -v pg_dump >/dev/null 2>&1; then
    echo "pg_dump nao encontrado. Instale com: brew install libpq" >&2
    echo "Depois rode: brew link --force libpq" >&2
    exit 1
  fi

  URL_SEM_PROTOCOLO="${SUPABASE_DB_URL#*://}"
  AUTORIDADE="${URL_SEM_PROTOCOLO%%/*}"
  USUARIO_INFO="${AUTORIDADE%@*}"
  URL_TEM_SENHA=false
  if [[ "$AUTORIDADE" == *"@"* && "$USUARIO_INFO" == *":"* ]]; then
    URL_TEM_SENHA=true
  fi

  if [[ -z "${PGPASSWORD:-}" && "$URL_TEM_SENHA" == false ]]; then
    read -rsp "Senha do banco Supabase: " PGPASSWORD
    export PGPASSWORD
    echo
  fi
  pg_dump "$SUPABASE_DB_URL" \
    --no-owner \
    --no-privileges \
    --format=plain \
    --file="$OUT"
else
  if ! command -v supabase >/dev/null 2>&1; then
    echo "Supabase CLI nao encontrado. Instale com: brew install supabase/tap/supabase" >&2
    exit 1
  fi
  supabase db dump --file "$OUT"
fi

gzip "$OUT"
echo "$OUT.gz"
