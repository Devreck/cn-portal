-- ============================================================
-- MIGRATION 11 — Remove AI-generated question with siblings
--                as a reproductive couple (Q42 bio)
-- ============================================================

-- Garantir extensão unaccent
CREATE EXTENSION IF NOT EXISTS unaccent;

-- ── PASSO 1: VER O QUE SERÁ DELETADO (rode só isso primeiro) ──
SELECT id, disciplina, tema, left(enunciado, 120) AS enunciado_preview
FROM public.questoes_banco
WHERE disciplina IN ('bio', 'inter')
  AND (
       lower(unaccent(enunciado)) like '%irmao%irma%filho%'
    OR lower(unaccent(enunciado)) like '%irmaos%planejam%'
    OR lower(unaccent(enunciado)) like '%irmaos biologicos%'
    OR lower(unaccent(enunciado)) like '%casal de primos%'
    OR lower(unaccent(enunciado)) like '%primos planejam%'
    OR lower(unaccent(enunciado)) like '%dois irmaos%'
  );

-- ── PASSO 2: DELETAR (só rode depois de confirmar o SELECT acima) ──
/*
DELETE FROM public.questoes_banco
WHERE disciplina IN ('bio', 'inter')
  AND (
       lower(unaccent(enunciado)) like '%irmao%irma%filho%'
    OR lower(unaccent(enunciado)) like '%irmaos%planejam%'
    OR lower(unaccent(enunciado)) like '%irmaos biologicos%'
    OR lower(unaccent(enunciado)) like '%casal de primos%'
    OR lower(unaccent(enunciado)) like '%primos planejam%'
    OR lower(unaccent(enunciado)) like '%dois irmaos%'
  );
*/
