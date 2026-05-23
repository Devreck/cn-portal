#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

node --check config.js
node --check js/engine/visual-renderer.js
node --check js/engine/questao-renderer.js
node --check js/questoes/bio.js
node --check js/questoes/quim.js
node --check js/questoes/fis.js
node --check js/questoes/simulado-questoes.js

node -e "const fs=require('fs'); for (const file of fs.readdirSync('.').filter(f=>f.endsWith('.html'))) { const html=fs.readFileSync(file,'utf8'); const scripts=[...html.matchAll(/<script(?![^>]*src=)[^>]*>([\\s\\S]*?)<\\/script>/gi)].map(m=>m[1]); scripts.forEach((s,i)=>{ try { new Function(s); } catch(e) { console.error(file+' inline script '+i+': '+e.message); process.exitCode=1; } }); }"

echo "OK: arquivos estaticos e scripts principais passaram na validacao sintatica."
