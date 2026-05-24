-- ============================================================
-- MIGRATION 11 — Remove AI-generated question with siblings
--                as a reproductive couple
-- ============================================================

-- Delete bio questions where the enunciado contains sibling/cousin couples
-- as reproductive partners (spotted by professor in Q42)
DELETE FROM public.questoes_banco
WHERE disciplina IN ('bio', 'inter')
  AND (
    lower(unaccent(enunciado)) ilike '%irmão%irmã%filhos%'
    OR lower(unaccent(enunciado)) ilike '%irmãos%planejam%'
    OR lower(unaccent(enunciado)) ilike '%irmãos biológicos%'
    OR lower(unaccent(enunciado)) ilike '%casal de primos%'
    OR lower(unaccent(enunciado)) ilike '%primos planejam%'
  );
