#!/usr/bin/env python3
"""
Regenera explicações incompletas, vazias ou truncadas em bio.js, quim.js, fis.js.
Chama o edge function regenerar_explicacao para cada questão problemática.
"""

import re
import time
import json
import sys
import requests

ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1cHdxenRjenVyeW91aHBpYmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0Nzk0ODEsImV4cCI6MjA5NTA1NTQ4MX0.sCI-8Qz0I4zIIOHyd8Xq3zdSO6gHV18ZYD_VMXnST0M"
EDGE_URL = "https://uupwqztczuryouhpiblx.supabase.co/functions/v1/gemini"
BASE = "/Users/deykoteixeira/Documents/revisaoprojeto/cn-portal/js/questoes"

FILES = {
    'bio':  f"{BASE}/bio.js",
    'quim': f"{BASE}/quim.js",
    'fis':  f"{BASE}/fis.js",
}

# ── Parser de blocos ─────────────────────────────────────────────

def parse_questions(filepath):
    """Extrai cada bloco de questão como texto, mais seus campos básicos.

    Usa abordagem de split por padrão de 'id:' para evitar problemas com
    chaves desbalanceadas dentro de strings (LaTeX, etc.).
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Encontrar posições de cada questão pelo padrão de id
    id_positions = []
    for m in re.finditer(r'\n\{[\s\n]*id:\s*[\'"]', content):
        id_positions.append(m.start() + 1)  # +1 para pular o \n, começa no {

    if not id_positions:
        return content, []

    questions = []
    for i, start in enumerate(id_positions):
        # O fim do bloco é o início do próximo ou o fim do arquivo
        end_search = id_positions[i+1] if i+1 < len(id_positions) else len(content)

        # Procurar o fechamento }\n (ou },\n) do bloco atual
        # dentro da região até a próxima questão
        region = content[start:end_search]

        # Encontrar o último '}' seguido de vírgula/newline/whitespace no final da região
        # que fecha o bloco da questão
        close_match = None
        for m in re.finditer(r'\}\s*,?\s*\n', region):
            close_match = m

        if close_match:
            block_end = start + close_match.end()
        else:
            block_end = end_search

        block = content[start:block_end]
        if "id: '" in block or 'id: "' in block:
            questions.append((start, block_end, block))

    return content, questions


def extract_field(block, field):
    """Extrai o valor de campo simples de string em JS."""
    # Tenta single-quote
    m = re.search(rf"{field}:\s*'((?:[^'\\]|\\.)*)'", block, re.DOTALL)
    if m:
        return m.group(1).replace("\\'", "'")
    # Tenta double-quote
    m = re.search(rf'{field}:\s*"((?:[^"\\]|\\.)*)"', block, re.DOTALL)
    if m:
        return m.group(1).replace('\\"', '"')
    return ''


def extract_alternativas(block):
    """Extrai alternativas A/B/C/D/E do bloco."""
    alts = {}
    m = re.search(r'alternativas:\s*\{([^}]+)\}', block, re.DOTALL)
    if not m:
        return None
    inner = m.group(1)
    for letter in 'ABCDE':
        lm = re.search(rf"{letter}:\s*'((?:[^'\\]|\\.)*)'", inner)
        if lm:
            alts[letter] = lm.group(1)
    return alts if alts else None


def extract_steps(block):
    """Extrai lista simplificada de steps (titulo + explicacao)."""
    steps = []
    # Encontrar o array steps: [...]
    sm = re.search(r'steps:\s*\[', block)
    if not sm:
        return []
    # Extrair blocos de steps individualmente
    step_blocks = re.findall(r'\{[^{}]*titulo:[^{}]*\}', block, re.DOTALL)
    for sb in step_blocks:
        titulo = extract_field(sb, 'titulo')
        hint = extract_field(sb, 'hint')
        exp = extract_field(sb, 'explicacao')
        latex = re.findall(r"'((?:[^'\\]|\\.)*)'", re.sub(r'linhas_latex:\s*\[', '', sb, count=1))
        steps.append({'titulo': titulo, 'hint': hint, 'explicacao': exp, 'linhas_latex': latex[:3]})
    return steps


ENGLISH_BAD_PATTERNS = [
    'everything looks solid', 'word count', 'ready to output',
    'this is correct', 'please note', 'in summary',
    'sentence length', 'char count',
]

def is_bad_explicacao(exp):
    """Retorna True se a explicação precisa ser regenerada."""
    exp = exp.strip()
    if not exp:
        return True
    if len(exp) < 80:
        return True
    # Termina sem pontuação adequada (pode estar truncada)
    if exp[-1] not in '.!?»"\')':
        return True
    # Contém meta-texto em inglês do modelo
    exp_lower = exp.lower()
    for pat in ENGLISH_BAD_PATTERNS:
        if pat in exp_lower:
            return True
    return False


def escape_js_string(s):
    """Escapa um string para uso em JS com single quotes."""
    # Escapa backslash e single quotes
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    return s


def call_edge_function(disciplina, tipo, tema, enunciado, alternativas, gabarito, steps):
    """Chama o edge function para regenerar a explicação."""
    payload = {
        "funcao": "regenerar_explicacao",
        "dados": {
            "disciplina": disciplina,
            "tipo": tipo,
            "tema": tema,
            "enunciado": enunciado,
            "alternativas": alternativas,
            "gabarito": gabarito,
            "steps_resumo": steps
        }
    }
    resp = requests.post(
        EDGE_URL,
        headers={
            "Authorization": f"Bearer {ANON_KEY}",
            "Content-Type": "application/json"
        },
        json=payload,
        timeout=60
    )
    data = resp.json()
    if resp.status_code == 200 and data.get('explicacao'):
        return data['explicacao']
    print(f"  ⚠ Edge function error: {data}")
    return None


def process_file(filepath, disciplina):
    """Processa um arquivo JS, regenera as explicações problemáticas."""
    print(f"\n{'='*60}")
    print(f"Processando: {filepath} [{disciplina}]")
    print('='*60)

    content, questions = parse_questions(filepath)
    fixes = []  # (start, end, new_block)
    total_fixed = 0

    for start, end, block in questions:
        qid   = extract_field(block, 'id')
        tipo  = extract_field(block, 'tipo')
        tema  = extract_field(block, 'tema')
        enun  = extract_field(block, 'enunciado')
        gab   = extract_field(block, 'gabarito')
        # Extrair explicacao SOMENTE da parte antes de steps: (para não pegar steps[n].explicacao)
        steps_pos = block.find('steps:')
        block_before_steps = block[:steps_pos] if steps_pos > 0 else block
        exp   = extract_field(block_before_steps, 'explicacao')
        alts  = extract_alternativas(block)
        steps = extract_steps(block)

        if not qid or not enun:
            continue

        if not is_bad_explicacao(exp):
            print(f"  ✓ {qid} OK ({len(exp)} chars)")
            continue

        print(f"  ✗ {qid} [{tipo}] exp='{exp[:50]}...' ({len(exp.strip())} chars) → regenerando...")

        # Retry up to 5 times — rejeita respostas truncadas ou com meta-texto inglês
        nova_exp = None
        for attempt in range(5):
            candidate = call_edge_function(disciplina, tipo, tema, enun, alts, gab, steps)
            if candidate and not is_bad_explicacao(candidate) and len(candidate.strip()) >= 200:
                nova_exp = candidate
                break
            reason = 'nula' if not candidate else f'ruim ({len((candidate or "").strip())} chars, ends={repr((candidate or "")[-30:])})'
            print(f"    Tentativa {attempt+1} rejeitada [{reason}], aguardando...")
            time.sleep(3)

        if not nova_exp:
            print(f"  ✗ {qid} FALHOU após 5 tentativas — mantendo original")
            continue

        nova_exp = nova_exp.strip()
        print(f"  ✓ {qid} OK → {len(nova_exp)} chars, termina: ...{repr(nova_exp[-25:])}")

        # Substituir explicacao no bloco
        escaped = escape_js_string(nova_exp)
        new_block = re.sub(
            r"(explicacao:\s*')((?:[^'\\]|\\.)*?)(')",
            lambda m: f"{m.group(1)}{escaped}{m.group(3)}",
            block,
            count=1
        )

        if new_block == block:
            # Talvez seja double-quoted ou vazia
            new_block = re.sub(
                r'(explicacao:\s*")((?:[^"\\]|\\.)*?)(")',
                lambda m: f"explicacao: '{escaped}'",
                block,
                count=1
            )

        if new_block == block:
            print(f"  ⚠ {qid} não conseguiu substituir no bloco")
            continue

        fixes.append((start, end, new_block))
        total_fixed += 1
        time.sleep(1.5)  # Rate limit gentil

    if not fixes:
        print(f"\nNenhuma correção necessária.")
        return 0

    # Aplicar correções de trás para frente (para não deslocar índices)
    new_content = content
    for start, end, new_block in sorted(fixes, key=lambda x: x[0], reverse=True):
        new_content = new_content[:start] + new_block + new_content[end:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"\n✅ {total_fixed} explicações corrigidas em {filepath}")
    return total_fixed


# ── Main ─────────────────────────────────────────────────────────

if __name__ == '__main__':
    discipline_arg = sys.argv[1] if len(sys.argv) > 1 else None
    total = 0

    for disc, path in FILES.items():
        if discipline_arg and disc != discipline_arg:
            continue
        fixed = process_file(path, disc)
        total += fixed

    print(f"\n{'='*60}")
    print(f"TOTAL DE EXPLICAÇÕES CORRIGIDAS: {total}")
    print('='*60)
