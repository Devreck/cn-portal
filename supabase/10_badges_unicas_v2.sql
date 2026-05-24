-- ============================================================
-- PORTAL CN MARISTA — BADGES ÚNICAS v2
-- Adiciona colunas de metadados, atualiza descrições,
-- adiciona Rebeca (The First), cria bucket de imagens e RLS.
-- Execute no SQL Editor do Supabase
-- ============================================================

-- 1. Adicionar colunas de metadados à tabela badges_unicas
alter table public.badges_unicas
  add column if not exists nome        text,
  add column if not exists emoji       text default '✨',
  add column if not exists imagem_url  text,
  add column if not exists descricao   text,
  add column if not exists concedido_por uuid references public.perfis(id);

-- 2. Atualizar Aura Tester com nova descrição
update public.badges_unicas
set
  nome      = 'Aura Tester',
  emoji     = '✨',
  descricao = 'Atribuída por ser o primeiro a reportar bugs na plataforma'
where badge_id = 'aura_tester';

-- 3. Inserir "The First" para Rebeca (turma 23A)
insert into public.badges_unicas (aluno_id, badge_id, nome, emoji, descricao)
select p.id, 'the_first', 'The First', '⭐', 'A primeira estudante a logar na plataforma'
from public.perfis p
where p.nome ilike '%rebeca%' and p.turma = '23A'
on conflict (aluno_id, badge_id) do nothing;

-- 4. Políticas RLS — professores podem criar e remover badges únicas
drop policy if exists "badges_unicas_professor_insert" on public.badges_unicas;
create policy "badges_unicas_professor_insert"
  on public.badges_unicas for insert
  to authenticated
  with check ((select role from public.perfis where id = auth.uid()) = 'professor');

drop policy if exists "badges_unicas_professor_delete" on public.badges_unicas;
create policy "badges_unicas_professor_delete"
  on public.badges_unicas for delete
  to authenticated
  using ((select role from public.perfis where id = auth.uid()) = 'professor');

drop policy if exists "badges_unicas_professor_update" on public.badges_unicas;
create policy "badges_unicas_professor_update"
  on public.badges_unicas for update
  to authenticated
  using ((select role from public.perfis where id = auth.uid()) = 'professor');

-- 5. Bucket de imagens para badges únicas
insert into storage.buckets (id, name, public)
values ('badge-images', 'badge-images', true)
on conflict (id) do nothing;

-- RLS: qualquer usuário pode ver as imagens (bucket público)
drop policy if exists "badge_images_public_select" on storage.objects;
create policy "badge_images_public_select"
  on storage.objects for select to public
  using (bucket_id = 'badge-images');

-- RLS: apenas professores podem fazer upload
drop policy if exists "badge_images_professor_insert" on storage.objects;
create policy "badge_images_professor_insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'badge-images'
    and (select role from public.perfis where id = auth.uid()) = 'professor'
  );

drop policy if exists "badge_images_professor_delete" on storage.objects;
create policy "badge_images_professor_delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'badge-images'
    and (select role from public.perfis where id = auth.uid()) = 'professor'
  );
