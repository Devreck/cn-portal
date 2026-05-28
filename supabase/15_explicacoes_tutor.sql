-- ============================================================
-- MIGRATION 15 — Explicações do Tutor IA por Questão
-- Cache compartilhado entre alunos: até 3 níveis por questão
-- ============================================================

CREATE TABLE IF NOT EXISTS public.explicacoes_tutor (
  id          uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  questao_id  text        NOT NULL,
  nivel       smallint    NOT NULL CHECK (nivel BETWEEN 1 AND 3),
  texto       text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (questao_id, nivel)
);

-- Índice para busca rápida por questão
CREATE INDEX IF NOT EXISTS idx_explicacoes_questao
  ON public.explicacoes_tutor (questao_id);

-- RLS
ALTER TABLE public.explicacoes_tutor ENABLE ROW LEVEL SECURITY;

-- Qualquer aluno autenticado pode ler
CREATE POLICY "leitura_explicacoes_tutor"
  ON public.explicacoes_tutor FOR SELECT
  TO authenticated USING (true);

-- Alunos ativos podem inserir (o unique constraint evita duplicatas)
CREATE POLICY "aluno_insert_explicacao_tutor"
  ON public.explicacoes_tutor FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.perfis
      WHERE id = auth.uid() AND ativo = true
    )
  );
