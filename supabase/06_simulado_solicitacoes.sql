-- ============================================================
-- SOLICITAÇÕES DE NOVOS SIMULADOS
-- ============================================================

create table if not exists public.simulado_solicitacoes (
  id               uuid primary key default uuid_generate_v4(),
  professor_id     uuid not null references public.perfis(id) on delete cascade,
  titulo           text not null default 'Novo simulado',
  foco             text not null,
  quantidade_itens integer not null default 60 check (quantidade_itens between 20 and 120),
  status           text not null default 'solicitado' check (status in ('solicitado', 'em_producao', 'concluido', 'cancelado')),
  observacoes      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.simulado_solicitacoes enable row level security;

drop policy if exists "professor_select_solicitacoes_simulado" on public.simulado_solicitacoes;
drop policy if exists "professor_insert_solicitacao_simulado" on public.simulado_solicitacoes;
drop policy if exists "professor_update_solicitacao_simulado" on public.simulado_solicitacoes;

create policy "professor_select_solicitacoes_simulado"
  on public.simulado_solicitacoes for select
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'professor'
      and p.ativo = true
    )
  );

create policy "professor_insert_solicitacao_simulado"
  on public.simulado_solicitacoes for insert
  with check (
    professor_id = auth.uid()
    and exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'professor'
      and p.ativo = true
    )
  );

create policy "professor_update_solicitacao_simulado"
  on public.simulado_solicitacoes for update
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid()
      and p.role = 'professor'
      and p.ativo = true
    )
  );
