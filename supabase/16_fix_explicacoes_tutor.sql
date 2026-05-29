-- ============================================================
-- MIGRATION 16 — Limpeza e melhoria do cache do Tutor IA
-- ============================================================

-- 1. Deletar respostas ruins (curtas ou sem pontuação final)
DELETE FROM public.explicacoes_tutor
WHERE LENGTH(texto) < 400
   OR RIGHT(TRIM(texto), 1) NOT IN ('.', '!', '?', '"', ')', ']', '*');

-- 2. Policy para UPDATE (sobrescrever respostas ruins)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'explicacoes_tutor'
      AND policyname = 'aluno_update_explicacao_tutor'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "aluno_update_explicacao_tutor"
        ON public.explicacoes_tutor FOR UPDATE
        TO authenticated
        USING (true)
        WITH CHECK (
          EXISTS (
            SELECT 1 FROM public.perfis
            WHERE id = auth.uid() AND ativo = true
          )
        )
    $pol$;
  END IF;
END$$;

-- 3. Policy para DELETE (remover resposta ruim e forçar regeneração)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'explicacoes_tutor'
      AND policyname = 'aluno_delete_explicacao_tutor'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "aluno_delete_explicacao_tutor"
        ON public.explicacoes_tutor FOR DELETE
        TO authenticated
        USING (true)
    $pol$;
  END IF;
END$$;
