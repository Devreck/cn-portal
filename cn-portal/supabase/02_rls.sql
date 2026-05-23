-- ============================================================
-- PORTAL CN MARISTA — ROW LEVEL SECURITY (RLS)
-- Execute APÓS o 01_schema.sql
-- ============================================================

-- Habilitar RLS em todas as tabelas
alter table public.perfis                  enable row level security;
alter table public.pontuacao               enable row level security;
alter table public.progresso_revisao       enable row level security;
alter table public.respostas               enable row level security;
alter table public.simulado_respostas      enable row level security;
alter table public.simulado_tentativas     enable row level security;
alter table public.sessoes                 enable row level security;
alter table public.badges_conquistados     enable row level security;
alter table public.questoes_banco          enable row level security;
alter table public.notificacoes_professor  enable row level security;

-- ============================================================
-- FUNÇÃO AUXILIAR: verificar se o usuário atual é professor
-- ============================================================
create or replace function public.is_professor()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.perfis
    where id   = auth.uid()
    and   role = 'professor'
  );
$$;

-- ============================================================
-- FUNÇÃO AUXILIAR: verificar se o usuário atual é aluno ativo
-- ============================================================
create or replace function public.is_aluno_ativo()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.perfis
    where id    = auth.uid()
    and   role  = 'aluno'
    and   ativo = true
  );
$$;

-- ============================================================
-- POLÍTICAS: perfis
-- ============================================================

-- Aluno vê apenas o próprio perfil
create policy "aluno_select_proprio_perfil"
  on public.perfis for select
  using (id = auth.uid());

-- Professor vê todos os perfis
create policy "professor_select_todos_perfis"
  on public.perfis for select
  using (public.is_professor());

-- Professor insere novos alunos
create policy "professor_insert_perfil"
  on public.perfis for insert
  with check (public.is_professor());

-- Professor atualiza qualquer perfil
create policy "professor_update_perfil"
  on public.perfis for update
  using (public.is_professor());

-- Aluno atualiza apenas o próprio perfil (ex: troca de senha_trocada)
create policy "aluno_update_proprio_perfil"
  on public.perfis for update
  using (id = auth.uid());

-- ============================================================
-- POLÍTICAS: pontuacao
-- ============================================================

-- Aluno vê apenas a própria pontuação
create policy "aluno_select_propria_pontuacao"
  on public.pontuacao for select
  using (aluno_id = auth.uid());

-- Aluno atualiza apenas a própria pontuação
create policy "aluno_update_propria_pontuacao"
  on public.pontuacao for update
  using (aluno_id = auth.uid());

-- Professor vê todas as pontuações
create policy "professor_select_todas_pontuacoes"
  on public.pontuacao for select
  using (public.is_professor());

-- ============================================================
-- POLÍTICAS: progresso_revisao
-- ============================================================

create policy "aluno_select_proprio_progresso"
  on public.progresso_revisao for select
  using (aluno_id = auth.uid());

create policy "aluno_update_proprio_progresso"
  on public.progresso_revisao for update
  using (aluno_id = auth.uid());

create policy "professor_select_todo_progresso"
  on public.progresso_revisao for select
  using (public.is_professor());

-- ============================================================
-- POLÍTICAS: respostas
-- ============================================================

create policy "aluno_select_proprias_respostas"
  on public.respostas for select
  using (aluno_id = auth.uid());

create policy "aluno_insert_propria_resposta"
  on public.respostas for insert
  with check (aluno_id = auth.uid());

create policy "professor_select_todas_respostas"
  on public.respostas for select
  using (public.is_professor());

-- ============================================================
-- POLÍTICAS: simulado_respostas
-- ============================================================

create policy "aluno_select_proprias_respostas_sim"
  on public.simulado_respostas for select
  using (aluno_id = auth.uid());

create policy "aluno_insert_propria_resposta_sim"
  on public.simulado_respostas for insert
  with check (aluno_id = auth.uid());

create policy "professor_select_todas_respostas_sim"
  on public.simulado_respostas for select
  using (public.is_professor());

-- ============================================================
-- POLÍTICAS: simulado_tentativas
-- ============================================================

create policy "aluno_select_proprias_tentativas"
  on public.simulado_tentativas for select
  using (aluno_id = auth.uid());

create policy "aluno_insert_propria_tentativa"
  on public.simulado_tentativas for insert
  with check (aluno_id = auth.uid());

create policy "aluno_update_propria_tentativa"
  on public.simulado_tentativas for update
  using (aluno_id = auth.uid());

create policy "professor_select_todas_tentativas"
  on public.simulado_tentativas for select
  using (public.is_professor());

-- ============================================================
-- POLÍTICAS: sessoes
-- ============================================================

create policy "aluno_insert_propria_sessao"
  on public.sessoes for insert
  with check (aluno_id = auth.uid());

create policy "aluno_update_propria_sessao"
  on public.sessoes for update
  using (aluno_id = auth.uid());

create policy "professor_select_todas_sessoes"
  on public.sessoes for select
  using (public.is_professor());

-- ============================================================
-- POLÍTICAS: badges_conquistados
-- ============================================================

-- Aluno vê apenas os próprios badges
create policy "aluno_select_proprios_badges"
  on public.badges_conquistados for select
  using (aluno_id = auth.uid());

-- Aluno insere os próprios badges
create policy "aluno_insert_proprio_badge"
  on public.badges_conquistados for insert
  with check (aluno_id = auth.uid());

-- Professor vê todos os badges
create policy "professor_select_todos_badges"
  on public.badges_conquistados for select
  using (public.is_professor());

-- RANKING: alunos podem ver badges de todos (para o ranking)
create policy "aluno_select_badges_ranking"
  on public.badges_conquistados for select
  using (public.is_aluno_ativo());

-- ============================================================
-- POLÍTICAS: questoes_banco
-- ============================================================

-- Aluno vê questões aprovadas e os próprios itens IA pendentes
create policy "aluno_select_questoes_aprovadas"
  on public.questoes_banco for select
  using (
    public.is_aluno_ativo()
    and (
      status in ('aprovada', 'editada')
      or (
        status = 'pendente'
        and origem = 'ia_gerada'
        and gerada_para = auth.uid()
      )
    )
  );

-- Aluno insere questões geradas (ficam como pendente)
create policy "aluno_insert_questao_gerada"
  on public.questoes_banco for insert
  with check (
    public.is_aluno_ativo()
    and status = 'pendente'
    and origem = 'ia_gerada'
    and gerada_para = auth.uid()
  );

-- Professor vê todas as questões (inclusive pendentes)
create policy "professor_select_todas_questoes"
  on public.questoes_banco for select
  using (public.is_professor());

-- Professor atualiza qualquer questão
create policy "professor_update_questao"
  on public.questoes_banco for update
  using (public.is_professor());

-- Professor insere questões manuais
create policy "professor_insert_questao_manual"
  on public.questoes_banco for insert
  with check (
    public.is_professor()
    and origem = 'manual'
  );

-- Professor deleta questões
create policy "professor_delete_questao"
  on public.questoes_banco for delete
  using (public.is_professor());

-- ============================================================
-- POLÍTICAS: notificacoes_professor
-- ============================================================

-- Professor vê apenas as próprias notificações
create policy "professor_select_proprias_notif"
  on public.notificacoes_professor for select
  using (professor_id = auth.uid());

-- Professor marca como lida
create policy "professor_update_propria_notif"
  on public.notificacoes_professor for update
  using (professor_id = auth.uid());

-- Sistema insere notificações (via service role / edge function)
create policy "sistema_insert_notif"
  on public.notificacoes_professor for insert
  with check (true);
