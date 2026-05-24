-- ============================================================
-- MIGRATION 08 — Unique constraint on respostas
-- Prevents double-counting of points from duplicate answer rows
-- (can occur when a student has two tabs open simultaneously)
-- ============================================================

-- Remove any existing duplicate rows, keeping only the first answer per question
DELETE FROM public.respostas
WHERE id NOT IN (
  SELECT DISTINCT ON (aluno_id, questao_id) id
  FROM public.respostas
  ORDER BY aluno_id, questao_id, created_at ASC
);

-- Add unique constraint to prevent future duplicates
ALTER TABLE public.respostas
  ADD CONSTRAINT respostas_aluno_questao_unique UNIQUE (aluno_id, questao_id);
