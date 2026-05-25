-- ============================================================
-- MIGRATION 14 — Sistema de Avaliação de Itens pelos Alunos
-- ============================================================

-- ── 1. Corrigir constraint de origem (adicionar 'aluno_gerada') ──
ALTER TABLE public.questoes_banco
  DROP CONSTRAINT IF EXISTS questoes_banco_origem_check;

ALTER TABLE public.questoes_banco
  ADD CONSTRAINT questoes_banco_origem_check
  CHECK (origem IN ('manual', 'ia_gerada', 'aluno_gerada'));

-- ── 2. Novos campos na tabela questoes_banco ──
ALTER TABLE public.questoes_banco
  ADD COLUMN IF NOT EXISTS avaliacao_aluno      TEXT
    CHECK (avaliacao_aluno IN ('joinha', 'alerta', 'errado')),
  ADD COLUMN IF NOT EXISTS professor_concorda   BOOLEAN;   -- null=não revisado, true/false

-- ── 3. pontos_avaliacao na tabela pontuacao ──
ALTER TABLE public.pontuacao
  ADD COLUMN IF NOT EXISTS pontos_avaliacao INTEGER NOT NULL DEFAULT 0;

-- ── 4. Atualizar RLS: alunos podem atualizar avaliacao_aluno nas próprias questões ──
DROP POLICY IF EXISTS "aluno_pode_avaliar_propria_questao" ON public.questoes_banco;
CREATE POLICY "aluno_pode_avaliar_propria_questao"
  ON public.questoes_banco
  FOR UPDATE
  TO authenticated
  USING  (gerada_para = auth.uid())
  WITH CHECK (gerada_para = auth.uid());

-- ── 5. Verificação ──
-- SELECT column_name, data_type
-- FROM information_schema.columns
-- WHERE table_name = 'questoes_banco'
--   AND column_name IN ('avaliacao_aluno', 'professor_concorda', 'origem');

-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'pontuacao' AND column_name = 'pontos_avaliacao';
