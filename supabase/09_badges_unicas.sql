-- ============================================================
-- PORTAL CN MARISTA — BADGES ÚNICAS
-- Execute no SQL Editor do Supabase
-- ============================================================

-- Tabela para badges especiais atribuídas manualmente pelo professor
create table if not exists public.badges_unicas (
  id            uuid primary key default uuid_generate_v4(),
  aluno_id      uuid not null references public.perfis(id) on delete cascade,
  badge_id      text not null,
  concedido_em  timestamptz not null default now(),
  unique(aluno_id, badge_id)
);

-- Row Level Security
alter table public.badges_unicas enable row level security;

-- Qualquer aluno autenticado pode visualizar todas as badges únicas (para exibição no ranking)
drop policy if exists "badges_unicas_select_authenticated" on public.badges_unicas;
create policy "badges_unicas_select_authenticated"
  on public.badges_unicas for select
  to authenticated
  using (true);

-- Inserir Aura Tester para Gabriel Volker (turma 23B)
insert into public.badges_unicas (aluno_id, badge_id)
select p.id, 'aura_tester'
from public.perfis p
where p.nome ilike '%gabriel%' and p.nome ilike '%volker%' and p.turma = '23B'
on conflict (aluno_id, badge_id) do nothing;

-- ============================================================
-- Atualizar get_ranking() para incluir questoes_respondidas e questoes_corretas
-- ============================================================
drop function if exists public.get_ranking();

create function public.get_ranking()
returns table (
  posicao              bigint,
  aluno_id             uuid,
  nome                 text,
  turma                text,
  pontos_total         integer,
  pontos_bio           integer,
  pontos_quim          integer,
  pontos_fis           integer,
  pontos_simulado      integer,
  streak_maximo        integer,
  badges_count         bigint,
  questoes_respondidas integer,
  questoes_corretas    integer
) language sql security definer as $$
  select
    row_number() over (order by p.pontos_total desc, p.updated_at asc) as posicao,
    pf.id,
    pf.nome,
    pf.turma,
    p.pontos_total,
    p.pontos_bio,
    p.pontos_quim,
    p.pontos_fis,
    p.pontos_simulado,
    p.streak_maximo,
    count(b.id) as badges_count,
    p.questoes_respondidas,
    p.questoes_corretas
  from public.pontuacao p
  join public.perfis pf on pf.id = p.aluno_id
  left join public.badges_conquistados b on b.aluno_id = pf.id
  where pf.role = 'aluno' and pf.ativo = true
  group by pf.id, pf.nome, pf.turma, p.pontos_total,
           p.pontos_bio, p.pontos_quim, p.pontos_fis,
           p.pontos_simulado, p.streak_maximo, p.updated_at,
           p.questoes_respondidas, p.questoes_corretas
  order by posicao;
$$;
