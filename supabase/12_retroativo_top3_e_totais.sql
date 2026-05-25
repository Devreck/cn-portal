-- ============================================================
-- MIGRATION 12 — Correções retroativas
--   A) Badge top3 para alunos já no top 3 do ranking
--   B) questoes_respondidas / questoes_corretas em pontuacao
--      recalculados somando todos os progresso_revisao do aluno
-- ============================================================

-- ── A. Badge top3 retroativo ──────────────────────────────
-- Insere o badge para os 3 alunos com maior pontos_total.
-- ON CONFLICT DO NOTHING evita duplicata.

INSERT INTO public.badges_conquistados (aluno_id, badge_id)
SELECT aluno_id, 'top3'
FROM (
  SELECT aluno_id,
         row_number() OVER (ORDER BY pontos_total DESC) AS posicao
  FROM public.pontuacao
  WHERE pontos_total > 0
) ranked
WHERE posicao <= 3
ON CONFLICT DO NOTHING;


-- ── B. Recalcular questoes_respondidas / questoes_corretas ──
-- Substitui o valor incorreto (somente última disciplina)
-- pelo total real, somando todos os progresso_revisao do aluno.

UPDATE public.pontuacao p
SET
  questoes_respondidas = COALESCE(totais.total_respondidas, 0),
  questoes_corretas    = COALESCE(totais.total_acertos,     0)
FROM (
  SELECT
    aluno_id,
    SUM(total_questoes) AS total_respondidas,
    SUM(acertos)        AS total_acertos
  FROM public.progresso_revisao
  GROUP BY aluno_id
) totais
WHERE p.aluno_id = totais.aluno_id;


-- ── Verificação ──────────────────────────────────────────
SELECT
  p.aluno_id,
  pr.nome,
  p.questoes_respondidas,
  p.questoes_corretas,
  CASE WHEN p.questoes_respondidas > 0
       THEN round(p.questoes_corretas * 100.0 / p.questoes_respondidas, 1)
       ELSE 0 END AS taxa_pct
FROM public.pontuacao p
JOIN public.perfis pr ON pr.id = p.aluno_id
ORDER BY p.questoes_respondidas DESC;
