-- ============================================================
-- MIGRATION 13 — Badge Única: "Lady Bug Hunter" para Luiza
-- ============================================================

-- Passo 1 — Confirmar a aluna (rode este SELECT antes)
SELECT id, nome, turma
FROM public.perfis
WHERE lower(unaccent(nome)) LIKE '%luiza%' AND turma = '23B';

-- Passo 2 — Inserir a badge (descomente após confirmar o id acima)
/*
INSERT INTO public.badges_unicas (aluno_id, badge_id, nome, emoji, descricao, concedido_em)
SELECT
  id,
  'lady_bug_hunter',
  'Lady Bug Hunter',
  '🐞',
  'Adquirida por serviços prestados à comunidade',
  now()
FROM public.perfis
WHERE lower(unaccent(nome)) LIKE '%luiza%' AND turma = '23B'
LIMIT 1;
*/

-- Verificação
-- SELECT bu.*, p.nome, p.turma
-- FROM public.badges_unicas bu
-- JOIN public.perfis p ON p.id = bu.aluno_id
-- WHERE bu.badge_id = 'lady_bug_hunter';
