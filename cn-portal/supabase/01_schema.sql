-- ============================================================
-- PORTAL CN MARISTA — SCHEMA COMPLETO
-- Execute no SQL Editor do Supabase
-- ============================================================

-- Extensões necessárias
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABELA: perfis
-- Extensão da tabela auth.users do Supabase
-- ============================================================
create table public.perfis (
  id              uuid primary key references auth.users(id) on delete cascade,
  matricula       text unique not null,
  nome            text not null,
  turma           text,
  email           text unique not null,
  role            text not null default 'aluno' check (role in ('aluno', 'professor')),
  senha_trocada   boolean not null default false,
  ativo           boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- TABELA: pontuacao
-- Um registro por aluno, atualizado em tempo real
-- ============================================================
create table public.pontuacao (
  id                uuid primary key default uuid_generate_v4(),
  aluno_id          uuid unique not null references public.perfis(id) on delete cascade,
  pontos_bio        integer not null default 0,
  pontos_quim       integer not null default 0,
  pontos_fis        integer not null default 0,
  pontos_simulado   integer not null default 0,
  pontos_bonus      integer not null default 0,
  pontos_total      integer not null default 0,
  streak_atual      integer not null default 0,
  streak_maximo     integer not null default 0,
  questoes_respondidas integer not null default 0,
  questoes_corretas    integer not null default 0,
  updated_at        timestamptz not null default now()
);

-- ============================================================
-- TABELA: progresso_revisao
-- Controla conclusão das 3 revisões por aluno
-- ============================================================
create table public.progresso_revisao (
  id                uuid primary key default uuid_generate_v4(),
  aluno_id          uuid not null references public.perfis(id) on delete cascade,
  disciplina        text not null check (disciplina in ('bio', 'quim', 'fis')),
  total_questoes    integer not null default 0,
  acertos           integer not null default 0,
  concluida         boolean not null default false,
  percentual        numeric(5,2) not null default 0,
  ultima_atividade  timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (aluno_id, disciplina)
);

-- ============================================================
-- TABELA: respostas
-- Registro individual de cada resposta na revisão
-- ============================================================
create table public.respostas (
  id               uuid primary key default uuid_generate_v4(),
  aluno_id         uuid not null references public.perfis(id) on delete cascade,
  questao_id       text not null,
  disciplina       text not null check (disciplina in ('bio', 'quim', 'fis')),
  tipo             text not null check (tipo in ('A', 'C')),
  correta          boolean not null,
  tempo_segundos   integer,
  streak_momento   integer not null default 0,
  pontos_ganhos    integer not null default 0,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABELA: simulado_respostas
-- Registro individual de cada resposta no simulado
-- ============================================================
create table public.simulado_respostas (
  id               uuid primary key default uuid_generate_v4(),
  aluno_id         uuid not null references public.perfis(id) on delete cascade,
  questao_id       text not null,
  disciplina       text not null check (disciplina in ('bio', 'quim', 'fis', 'inter')),
  tipo             text not null check (tipo in ('A', 'C')),
  correta          boolean not null,
  tempo_segundos   integer,
  pontos_ganhos    integer not null default 0,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABELA: simulado_tentativas
-- Controla tentativas do simulado (apenas 1 simultânea)
-- ============================================================
create table public.simulado_tentativas (
  id               uuid primary key default uuid_generate_v4(),
  aluno_id         uuid not null references public.perfis(id) on delete cascade,
  iniciado_em      timestamptz not null default now(),
  finalizado_em    timestamptz,
  tempo_total_segundos integer,
  pontos_obtidos   integer not null default 0,
  concluido        boolean not null default false,
  tentativa_num    integer not null default 1
);

-- ============================================================
-- TABELA: sessoes
-- Rastreamento de tempo por página
-- ============================================================
create table public.sessoes (
  id               uuid primary key default uuid_generate_v4(),
  aluno_id         uuid not null references public.perfis(id) on delete cascade,
  pagina           text not null,
  inicio           timestamptz not null default now(),
  fim              timestamptz,
  duracao_segundos integer,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABELA: badges_conquistados
-- Badges desbloqueados por aluno
-- ============================================================
create table public.badges_conquistados (
  id               uuid primary key default uuid_generate_v4(),
  aluno_id         uuid not null references public.perfis(id) on delete cascade,
  badge_id         text not null,
  conquistado_em   timestamptz not null default now(),
  unique (aluno_id, badge_id)
);

-- ============================================================
-- TABELA: questoes_banco
-- Banco colaborativo de questões geradas pela IA
-- ============================================================
create table public.questoes_banco (
  id               uuid primary key default uuid_generate_v4(),
  origem           text not null default 'ia_gerada' check (origem in ('manual', 'ia_gerada')),
  gerada_para      uuid references public.perfis(id) on delete set null,
  disciplina       text not null check (disciplina in ('bio', 'quim', 'fis', 'inter')),
  tema             text not null,
  subtema          text,
  tipo             text not null check (tipo in ('A', 'C')),
  nivel            text not null check (nivel in ('basico', 'intermediario', 'avancado')),
  interdisciplinar_com text[],
  enunciado        text not null,
  texto_base       jsonb,
  alternativas     jsonb,
  gabarito         text not null,
  explicacao       text not null,
  steps            jsonb,
  elementos_visuais jsonb,
  status           text not null default 'pendente' check (status in ('pendente', 'aprovada', 'editada', 'rejeitada')),
  revisada_por     uuid references public.perfis(id) on delete set null,
  revisada_em      timestamptz,
  nota_revisor     text,
  vezes_usada      integer not null default 0,
  total_respostas  integer not null default 0,
  total_acertos    integer not null default 0,
  taxa_acerto      numeric(5,2),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ============================================================
-- TABELA: notificacoes_professor
-- Alertas para revisão de novas questões
-- ============================================================
create table public.notificacoes_professor (
  id               uuid primary key default uuid_generate_v4(),
  professor_id     uuid not null references public.perfis(id) on delete cascade,
  tipo             text not null check (tipo in ('nova_questao', 'questao_editada', 'novo_aluno')),
  referencia_id    uuid,
  mensagem         text not null,
  lida             boolean not null default false,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- ÍNDICES para performance
-- ============================================================
create index idx_respostas_aluno       on public.respostas(aluno_id);
create index idx_respostas_disciplina  on public.respostas(disciplina);
create index idx_respostas_questao     on public.respostas(questao_id);
create index idx_sessoes_aluno         on public.sessoes(aluno_id);
create index idx_sessoes_pagina        on public.sessoes(pagina);
create index idx_questoes_status       on public.questoes_banco(status);
create index idx_questoes_disciplina   on public.questoes_banco(disciplina);
create index idx_badges_aluno          on public.badges_conquistados(aluno_id);
create index idx_pontuacao_total       on public.pontuacao(pontos_total desc);

-- ============================================================
-- FUNÇÃO: atualizar updated_at automaticamente
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers de updated_at
create trigger trg_perfis_updated_at
  before update on public.perfis
  for each row execute function public.handle_updated_at();

create trigger trg_pontuacao_updated_at
  before update on public.pontuacao
  for each row execute function public.handle_updated_at();

create trigger trg_progresso_updated_at
  before update on public.progresso_revisao
  for each row execute function public.handle_updated_at();

create trigger trg_questoes_updated_at
  before update on public.questoes_banco
  for each row execute function public.handle_updated_at();

-- ============================================================
-- FUNÇÃO: criar perfil e pontuação automaticamente
-- Acionada quando um novo usuário é criado no auth.users
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  -- Cria o perfil (dados vêm dos metadados do usuário)
  insert into public.perfis (id, matricula, nome, turma, email, role, senha_trocada)
  values (
    new.id,
    new.raw_user_meta_data->>'matricula',
    new.raw_user_meta_data->>'nome',
    new.raw_user_meta_data->>'turma',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'aluno'),
    false
  );

  -- Cria registro de pontuação zerado
  insert into public.pontuacao (aluno_id)
  values (new.id);

  -- Cria progresso das 3 disciplinas zerado
  insert into public.progresso_revisao (aluno_id, disciplina)
  values
    (new.id, 'bio'),
    (new.id, 'quim'),
    (new.id, 'fis');

  return new;
end;
$$;

create trigger trg_new_user
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- FUNÇÃO: calcular e atualizar pontuação total
-- ============================================================
create or replace function public.recalcular_pontuacao(p_aluno_id uuid)
returns void language plpgsql security definer as $$
begin
  update public.pontuacao
  set
    pontos_total = pontos_bio + pontos_quim + pontos_fis + pontos_simulado + pontos_bonus,
    updated_at   = now()
  where aluno_id = p_aluno_id;
end;
$$;

-- ============================================================
-- FUNÇÃO: verificar e desbloquear simulado
-- Simulado só abre quando as 3 revisões estão concluídas
-- ============================================================
create or replace function public.simulado_desbloqueado(p_aluno_id uuid)
returns boolean language plpgsql security definer as $$
declare
  v_concluidas integer;
begin
  select count(*) into v_concluidas
  from public.progresso_revisao
  where aluno_id = p_aluno_id
    and concluida = true;

  return v_concluidas >= 3;
end;
$$;

-- ============================================================
-- FUNÇÃO: registrar sessão (chamada pelo frontend)
-- ============================================================
create or replace function public.fechar_sessao(p_sessao_id uuid)
returns void language plpgsql security definer as $$
begin
  update public.sessoes
  set
    fim              = now(),
    duracao_segundos = extract(epoch from (now() - inicio))::integer
  where id = p_sessao_id;
end;
$$;

-- ============================================================
-- FUNÇÃO: ranking geral (top 150)
-- ============================================================
create or replace function public.get_ranking()
returns table (
  posicao        bigint,
  aluno_id       uuid,
  nome           text,
  turma          text,
  pontos_total   integer,
  pontos_bio     integer,
  pontos_quim    integer,
  pontos_fis     integer,
  pontos_simulado integer,
  streak_maximo  integer,
  badges_count   bigint
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
    count(b.id) as badges_count
  from public.pontuacao p
  join public.perfis pf on pf.id = p.aluno_id
  left join public.badges_conquistados b on b.aluno_id = pf.id
  where pf.role = 'aluno' and pf.ativo = true
  group by pf.id, pf.nome, pf.turma, p.pontos_total,
           p.pontos_bio, p.pontos_quim, p.pontos_fis,
           p.pontos_simulado, p.streak_maximo, p.updated_at
  order by posicao;
$$;

-- ============================================================
-- FUNÇÃO: estatísticas da turma para o professor
-- ============================================================
create or replace function public.get_stats_turma()
returns table (
  total_alunos          bigint,
  alunos_ativos         bigint,
  media_pontuacao       numeric,
  revisoes_bio_concluidas  bigint,
  revisoes_quim_concluidas bigint,
  revisoes_fis_concluidas  bigint,
  simulados_concluidos  bigint,
  questoes_pendentes    bigint
) language sql security definer as $$
  select
    (select count(*) from public.perfis where role = 'aluno' and ativo = true),
    (select count(distinct aluno_id) from public.sessoes
     where inicio > now() - interval '7 days'),
    (select round(avg(pontos_total), 0) from public.pontuacao),
    (select count(*) from public.progresso_revisao where disciplina = 'bio' and concluida = true),
    (select count(*) from public.progresso_revisao where disciplina = 'quim' and concluida = true),
    (select count(*) from public.progresso_revisao where disciplina = 'fis' and concluida = true),
    (select count(*) from public.simulado_tentativas where concluido = true),
    (select count(*) from public.questoes_banco where status = 'pendente');
$$;

-- ============================================================
-- FUNÇÃO: taxa de acerto por questão (para o professor)
-- ============================================================
create or replace function public.get_stats_questoes()
returns table (
  questao_id    text,
  disciplina    text,
  tipo          text,
  total         bigint,
  acertos       bigint,
  taxa_acerto   numeric
) language sql security definer as $$
  select
    questao_id,
    disciplina,
    tipo,
    count(*) as total,
    count(*) filter (where correta = true) as acertos,
    round(
      count(*) filter (where correta = true)::numeric / count(*) * 100,
    1) as taxa_acerto
  from public.respostas
  group by questao_id, disciplina, tipo
  order by taxa_acerto asc;
$$;
