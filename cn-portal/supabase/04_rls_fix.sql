-- ============================================================
-- CORREÇÃO RLS — Execute no SQL Editor do Supabase
-- ============================================================

-- 1. Remover políticas conflitantes existentes
drop policy if exists "aluno_select_proprio_perfil"   on public.perfis;
drop policy if exists "professor_select_todos_perfis" on public.perfis;
drop policy if exists "professor_insert_perfil"       on public.perfis;
drop policy if exists "professor_update_perfil"       on public.perfis;
drop policy if exists "aluno_update_proprio_perfil"   on public.perfis;

-- 2. Recriar política principal — qualquer usuário autenticado
--    pode ler o PRÓPRIO perfil (pelo id do auth)
create policy "usuario_le_proprio_perfil"
  on public.perfis for select
  using (id = auth.uid());

-- 3. Professor lê todos os perfis
create policy "professor_le_todos_perfis"
  on public.perfis for select
  using (
    exists (
      select 1 from public.perfis p2
      where p2.id = auth.uid()
      and   p2.role = 'professor'
    )
  );

-- 4. Professor insere novos alunos
create policy "professor_insere_perfil"
  on public.perfis for insert
  with check (
    exists (
      select 1 from public.perfis p2
      where p2.id = auth.uid()
      and   p2.role = 'professor'
    )
  );

-- 5. Professor atualiza qualquer perfil
create policy "professor_atualiza_perfil"
  on public.perfis for update
  using (
    exists (
      select 1 from public.perfis p2
      where p2.id = auth.uid()
      and   p2.role = 'professor'
    )
  );

-- 6. Aluno atualiza apenas o próprio perfil (ex: senha_trocada)
create policy "aluno_atualiza_proprio_perfil"
  on public.perfis for update
  using (id = auth.uid());

-- ============================================================
-- Corrigir RLS da pontuacao também (mesma lógica)
-- ============================================================
drop policy if exists "aluno_select_propria_pontuacao"    on public.pontuacao;
drop policy if exists "aluno_update_propria_pontuacao"    on public.pontuacao;
drop policy if exists "professor_select_todas_pontuacoes" on public.pontuacao;

create policy "usuario_le_propria_pontuacao"
  on public.pontuacao for select
  using (aluno_id = auth.uid());

create policy "usuario_atualiza_propria_pontuacao"
  on public.pontuacao for update
  using (aluno_id = auth.uid());

create policy "professor_le_todas_pontuacoes"
  on public.pontuacao for select
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and   p.role = 'professor'
    )
  );

-- ============================================================
-- Corrigir RLS do progresso_revisao
-- ============================================================
drop policy if exists "aluno_select_proprio_progresso"  on public.progresso_revisao;
drop policy if exists "aluno_update_proprio_progresso"  on public.progresso_revisao;
drop policy if exists "professor_select_todo_progresso" on public.progresso_revisao;

create policy "usuario_le_proprio_progresso"
  on public.progresso_revisao for select
  using (aluno_id = auth.uid());

create policy "usuario_atualiza_proprio_progresso"
  on public.progresso_revisao for update
  using (aluno_id = auth.uid());

create policy "professor_le_todo_progresso"
  on public.progresso_revisao for select
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and   p.role = 'professor'
    )
  );

-- ============================================================
-- VERIFICAÇÃO — deve retornar as políticas criadas
-- ============================================================
select tablename, policyname, cmd
from pg_policies
where schemaname = 'public'
  and tablename in ('perfis', 'pontuacao', 'progresso_revisao')
order by tablename, policyname;
