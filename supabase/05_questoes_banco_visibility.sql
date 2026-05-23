-- ============================================================
-- QUESTOES_BANCO: VISIBILIDADE DE ITENS IA + CONTADOR LOGIN
-- ============================================================

drop policy if exists "aluno_select_questoes_aprovadas" on public.questoes_banco;
drop policy if exists "aluno_insert_questao_gerada" on public.questoes_banco;
drop policy if exists "professor_select_todas_questoes" on public.questoes_banco;
drop policy if exists "professor_update_questao" on public.questoes_banco;
drop policy if exists "professor_insert_questao_manual" on public.questoes_banco;
drop policy if exists "professor_delete_questao" on public.questoes_banco;

create policy "aluno_select_questoes_aprovadas"
  on public.questoes_banco for select
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'aluno'
      and p.ativo = true
    )
    and (
      status in ('aprovada', 'editada')
      or (
        status = 'pendente'
        and origem = 'ia_gerada'
        and gerada_para = auth.uid()
      )
    )
  );

create policy "aluno_insert_questao_gerada"
  on public.questoes_banco for insert
  with check (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'aluno'
      and p.ativo = true
    )
    and status = 'pendente'
    and origem = 'ia_gerada'
    and gerada_para = auth.uid()
  );

create policy "professor_select_todas_questoes"
  on public.questoes_banco for select
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'professor'
      and p.ativo = true
    )
  );

create policy "professor_update_questao"
  on public.questoes_banco for update
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'professor'
      and p.ativo = true
    )
  );

create policy "professor_insert_questao_manual"
  on public.questoes_banco for insert
  with check (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'professor'
      and p.ativo = true
    )
    and origem = 'manual'
  );

create policy "professor_delete_questao"
  on public.questoes_banco for delete
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'professor'
      and p.ativo = true
    )
  );

create or replace function public.get_public_login_stats()
returns table(total_itens bigint, itens_ia_aprovados bigint)
language sql
security definer
set search_path = public
as $$
  select
    120::bigint + count(*)::bigint as total_itens,
    count(*)::bigint as itens_ia_aprovados
  from public.questoes_banco
  where status in ('aprovada', 'editada');
$$;

grant execute on function public.get_public_login_stats() to anon, authenticated;
