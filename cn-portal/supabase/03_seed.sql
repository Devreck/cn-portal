-- ============================================================
-- PORTAL CN MARISTA — SEED DE USUÁRIOS (v2)
-- Email dos alunos: matricula@maristabrasil.g12.br
-- Execute APÓS 01_schema.sql e 02_rls.sql
-- ============================================================

-- Habilitar extensão de criptografia (necessária para senhas)
create extension if not exists pgcrypto;

-- ============================================================
-- FUNÇÃO: criar_usuario
-- Cria usuário no auth.users (trigger cria o perfil automaticamente)
-- ============================================================
create or replace function public.criar_usuario(
  p_email       text,
  p_senha       text,
  p_matricula   text,
  p_nome        text,
  p_turma       text,
  p_role        text default 'aluno'
)
returns uuid language plpgsql security definer as $$
declare
  v_user_id uuid;
begin
  -- Evita duplicatas
  select id into v_user_id from auth.users where email = p_email;
  if v_user_id is not null then
    raise notice 'Usuário já existe: %', p_email;
    return v_user_id;
  end if;

  v_user_id := uuid_generate_v4();

  insert into auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    role,
    aud,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  ) values (
    v_user_id,
    '00000000-0000-0000-0000-000000000000',
    p_email,
    crypt(p_senha, gen_salt('bf')),
    now(),
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    jsonb_build_object(
      'matricula', p_matricula,
      'nome',      p_nome,
      'turma',     p_turma,
      'role',      p_role
    ),
    'authenticated',
    'authenticated',
    now(),
    now(),
    '',
    ''
  );

  return v_user_id;
end;
$$;


-- ============================================================
-- PROFESSORES (email institucional + senha: Marista@2026Professor)
-- ============================================================
select public.criar_usuario('deyko.teixeira@maristabrasil.org','Marista@2026Professor','PROF001','DEYKO TEIXEIRA',null,'professor');
select public.criar_usuario('rosely.braz@maristabrasil.org','Marista@2026Professor','PROF002','ROSELY BRAZ',null,'professor');
select public.criar_usuario('joao.bruno@maristabrasil.org','Marista@2026Professor','PROF003','JOÃO BRUNO',null,'professor');

-- ============================================================
-- TURMA 23A — 29 alunos (senha: Marista@2026)
-- ============================================================
select public.criar_usuario('2043260353@maristabrasil.g12.br','Marista@2026','2043260353','ÁLVARO AMORIM CUNHA MARTINS','23A');
select public.criar_usuario('2043130157@maristabrasil.g12.br','Marista@2026','2043130157','CAROLINA BORGES FURTADO NEVES','23A');
select public.criar_usuario('2043160370@maristabrasil.g12.br','Marista@2026','2043160370','FERNANDA RIBEIRO LIMA','23A');
select public.criar_usuario('2043220170@maristabrasil.g12.br','Marista@2026','2043220170','FRANCISCO PEREIRA DE SOUSA SILVEIRA','23A');
select public.criar_usuario('2043160234@maristabrasil.g12.br','Marista@2026','2043160234','GIOVANNA FERNANDES ABEN ATHAR','23A');
select public.criar_usuario('2043150245@maristabrasil.g12.br','Marista@2026','2043150245','GUSTAVO HENRIQUE MOTTA MOREIRA','23A');
select public.criar_usuario('2043250326@maristabrasil.g12.br','Marista@2026','2043250326','ISADORA GUIMARÃES MADRUGA SINOTT LOPES','23A');
select public.criar_usuario('2043200081@maristabrasil.g12.br','Marista@2026','2043200081','JOÃO PEDRO NOBRE REIS','23A');
select public.criar_usuario('2043250321@maristabrasil.g12.br','Marista@2026','2043250321','JOÃO VITOR LIMA ANDRADE','23A');
select public.criar_usuario('2043240189@maristabrasil.g12.br','Marista@2026','2043240189','JÚLIO RAMOS DE SOUZA E SILVA','23A');
select public.criar_usuario('2043220181@maristabrasil.g12.br','Marista@2026','2043220181','LETÍCIA DE AZEVEDO E OLIVEIRA','23A');
select public.criar_usuario('2043120116@maristabrasil.g12.br','Marista@2026','2043120116','LETÍCIA VAZ DA COSTA RIBEIRO','23A');
select public.criar_usuario('2043240019@maristabrasil.g12.br','Marista@2026','2043240019','LOUISE REZENDE DE OLIVEIRA','23A');
select public.criar_usuario('2043140164@maristabrasil.g12.br','Marista@2026','2043140164','LUCAS AKIRA YOSHIMINE SILVA','23A');
select public.criar_usuario('2043240186@maristabrasil.g12.br','Marista@2026','2043240186','LUCAS CARVALHO SILVEIRA','23A');
select public.criar_usuario('2043250119@maristabrasil.g12.br','Marista@2026','2043250119','MARIA FERNANDA BEDIN WELTER','23A');
select public.criar_usuario('2043170184@maristabrasil.g12.br','Marista@2026','2043170184','MARIA LUISA CARVALHO MESQUITA','23A');
select public.criar_usuario('2043250217@maristabrasil.g12.br','Marista@2026','2043250217','MARIA LUIZA PIMENTA DE SOUSA','23A');
select public.criar_usuario('2043230167@maristabrasil.g12.br','Marista@2026','2043230167','MARIA THAYLA OLIVEIRA LACERDA','23A');
select public.criar_usuario('2043240003@maristabrasil.g12.br','Marista@2026','2043240003','MARIANA BEATRIZ SOARES COELHO DA COSTA','23A');
select public.criar_usuario('2043120068@maristabrasil.g12.br','Marista@2026','2043120068','NÍCOLAS TARSITANO NOBRE','23A');
select public.criar_usuario('2043230175@maristabrasil.g12.br','Marista@2026','2043230175','NINA HARTMANN E SÁ','23A');
select public.criar_usuario('2043240393@maristabrasil.g12.br','Marista@2026','2043240393','OTÁVIO ALVES GALVÃO NETO','23A');
select public.criar_usuario('2043150381@maristabrasil.g12.br','Marista@2026','2043150381','PEDRO ROMANO PONTES DE FARIA CAMPOS','23A');
select public.criar_usuario('2043250219@maristabrasil.g12.br','Marista@2026','2043250219','REBECA MOURA MARTINS','23A');
select public.criar_usuario('2043240197@maristabrasil.g12.br','Marista@2026','2043240197','RENERSON KOHLER FEDALTO FILHO','23A');
select public.criar_usuario('2043240297@maristabrasil.g12.br','Marista@2026','2043240297','SELTON FELIPE DA SILVA FURTADO','23A');
select public.criar_usuario('2043160237@maristabrasil.g12.br','Marista@2026','2043160237','VALENTINA MESQUITA FIGUEIREDO','23A');
select public.criar_usuario('2043240364@maristabrasil.g12.br','Marista@2026','2043240364','VALENTINA VALE DO MONTE ROSA','23A');

-- ============================================================
-- TURMA 23B — 33 alunos (senha: Marista@2026)
-- ============================================================
select public.criar_usuario('2043150218@maristabrasil.g12.br','Marista@2026','2043150218','ANA SOPHIA SOUSA GUIMARÃES','23B');
select public.criar_usuario('2043240313@maristabrasil.g12.br','Marista@2026','2043240313','ARTUR ROTH BRASIL FERREIRA','23B');
select public.criar_usuario('2043200125@maristabrasil.g12.br','Marista@2026','2043200125','BRUNO LUSTZ RODRIGUES','23B');
select public.criar_usuario('2043150379@maristabrasil.g12.br','Marista@2026','2043150379','CAMILA OKADA LINARES SANTOS','23B');
select public.criar_usuario('2043200190@maristabrasil.g12.br','Marista@2026','2043200190','CLARA TAVARES COMETTI','23B');
select public.criar_usuario('2043140047@maristabrasil.g12.br','Marista@2026','2043140047','FERNANDA SANT´ANNA DE ANDRADE','23B');
select public.criar_usuario('2043230202@maristabrasil.g12.br','Marista@2026','2043230202','FLOR MARIANA ENCARNAÇÃO CIDADE','23B');
select public.criar_usuario('2043200098@maristabrasil.g12.br','Marista@2026','2043200098','FRANCISCO ALBERT KAHN STEPHAN','23B');
select public.criar_usuario('2043190218@maristabrasil.g12.br','Marista@2026','2043190218','FRANCISCO LLERAS MELLO','23B');
select public.criar_usuario('2043240385@maristabrasil.g12.br','Marista@2026','2043240385','GABRIEL VÖLKER LACERDA','23B');
select public.criar_usuario('2043150242@maristabrasil.g12.br','Marista@2026','2043150242','GUILHERME DE SOUZA NOGUEIRA DE ANDRADE','23B');
select public.criar_usuario('2043230132@maristabrasil.g12.br','Marista@2026','2043230132','GUSTAVO MENDES MAGALHÃES','23B');
select public.criar_usuario('2043230196@maristabrasil.g12.br','Marista@2026','2043230196','IARA TEIXEIRA SAUERBRONN','23B');
select public.criar_usuario('2043150084@maristabrasil.g12.br','Marista@2026','2043150084','IGOR BALDUINO DE GUSMÃO','23B');
select public.criar_usuario('2043230124@maristabrasil.g12.br','Marista@2026','2043230124','IVANA MEI LEITE PEREIRA','23B');
select public.criar_usuario('2043140315@maristabrasil.g12.br','Marista@2026','2043140315','JOÃO PEDRO MAIA TEIXEIRA','23B');
select public.criar_usuario('2043150310@maristabrasil.g12.br','Marista@2026','2043150310','JÚLIA LEMES SILVA','23B');
select public.criar_usuario('2043250293@maristabrasil.g12.br','Marista@2026','2043250293','JÚLIA SANTOS FONTINELE E SILVA','23B');
select public.criar_usuario('2043240020@maristabrasil.g12.br','Marista@2026','2043240020','LAÍS REZENDE DE OLIVEIRA','23B');
select public.criar_usuario('2043190025@maristabrasil.g12.br','Marista@2026','2043190025','LORENA ALVES REINA ALVES','23B');
select public.criar_usuario('2043160304@maristabrasil.g12.br','Marista@2026','2043160304','LUÍSA MARIM DOS SANTOS','23B');
select public.criar_usuario('2043240386@maristabrasil.g12.br','Marista@2026','2043240386','LUIZA NÓBREGA REZENDE CORTEZ','23B');
select public.criar_usuario('2043250320@maristabrasil.g12.br','Marista@2026','2043250320','MARIA EDUARDA BARBOSA LIMA','23B');
select public.criar_usuario('2043220089@maristabrasil.g12.br','Marista@2026','2043220089','MARIA EDUARDA GUIMARÃES BEZERRA DE MENEZES','23B');
select public.criar_usuario('2043170273@maristabrasil.g12.br','Marista@2026','2043170273','MARIANA DE ARAGÃO SANJAD','23B');
select public.criar_usuario('2043240017@maristabrasil.g12.br','Marista@2026','2043240017','MATEUS CRISTIANO QUEIROZ DA SILVA GOMES','23B');
select public.criar_usuario('2043140375@maristabrasil.g12.br','Marista@2026','2043140375','MATEUS DE OLIVEIRA CARVALHO','23B');
select public.criar_usuario('2043190290@maristabrasil.g12.br','Marista@2026','2043190290','MEL AVILA MALLAB','23B');
select public.criar_usuario('2043260324@maristabrasil.g12.br','Marista@2026','2043260324','MÔNICA GUIMARÃES MACEDO','23B');
select public.criar_usuario('2043160214@maristabrasil.g12.br','Marista@2026','2043160214','PEDRO HENRIQUE SANTOS DE ALMEIDA','23B');
select public.criar_usuario('2043250308@maristabrasil.g12.br','Marista@2026','2043250308','SANDRA REGINA SOUZA DOS SANTOS','23B');
select public.criar_usuario('2043240318@maristabrasil.g12.br','Marista@2026','2043240318','TERESA FERNANDES MONDONI','23B');
select public.criar_usuario('2043130162@maristabrasil.g12.br','Marista@2026','2043130162','THEO DE LUCENA CASARIN DALMAS','23B');

-- ============================================================
-- TURMA 23C — 27 alunos (senha: Marista@2026)
-- ============================================================
select public.criar_usuario('2043260346@maristabrasil.g12.br','Marista@2026','2043260346','ANA AROSO SANTOS','23C');
select public.criar_usuario('2043200198@maristabrasil.g12.br','Marista@2026','2043200198','ANA CLARA MACÊDO MOREIRA SANTOS','23C');
select public.criar_usuario('2043150030@maristabrasil.g12.br','Marista@2026','2043150030','BERNARDO AQUINO BRANDÃO DE CASTILHO','23C');
select public.criar_usuario('2043260368@maristabrasil.g12.br','Marista@2026','2043260368','BERNARDO MIGUEL DRUMMOND DAIHA','23C');
select public.criar_usuario('2043160156@maristabrasil.g12.br','Marista@2026','2043160156','CAUÊ NOVO MENDES','23C');
select public.criar_usuario('2043140531@maristabrasil.g12.br','Marista@2026','2043140531','CLARA MONTEIRO SANTOS NEIVA','23C');
select public.criar_usuario('2043250155@maristabrasil.g12.br','Marista@2026','2043250155','DAVI COSTA ANTUNES','23C');
select public.criar_usuario('2043190096@maristabrasil.g12.br','Marista@2026','2043190096','ELLEN ANTONINI PALMA','23C');
select public.criar_usuario('2043220119@maristabrasil.g12.br','Marista@2026','2043220119','ENZO INNECCO SANTOS DONATI BARBOSA','23C');
select public.criar_usuario('2043140241@maristabrasil.g12.br','Marista@2026','2043140241','FERNANDA JÁUREGUI DE CARVALHO','23C');
select public.criar_usuario('2043240271@maristabrasil.g12.br','Marista@2026','2043240271','GABRIEL DE CASTRO RÊGO DE CARVALHO','23C');
select public.criar_usuario('2043120232@maristabrasil.g12.br','Marista@2026','2043120232','GUSTAVO SILVA DE OLIVEIRA','23C');
select public.criar_usuario('2043240292@maristabrasil.g12.br','Marista@2026','2043240292','HELENA MIRANDA LOLATO','23C');
select public.criar_usuario('2043150082@maristabrasil.g12.br','Marista@2026','2043150082','ISABELA PORTO AITA BITTENCOURT','23C');
select public.criar_usuario('2043250318@maristabrasil.g12.br','Marista@2026','2043250318','JOÃO BARROS FONSECA','23C');
select public.criar_usuario('2043200173@maristabrasil.g12.br','Marista@2026','2043200173','JOÃO PEDRO MIZIARA ROCHA','23C');
select public.criar_usuario('2043200223@maristabrasil.g12.br','Marista@2026','2043200223','JULIA FERREIRA MIRANDA','23C');
select public.criar_usuario('2043230169@maristabrasil.g12.br','Marista@2026','2043230169','LÍVIA COSTA BERNARDO','23C');
select public.criar_usuario('2043240330@maristabrasil.g12.br','Marista@2026','2043240330','MAITÊ CAVALCANTE LIMA GARBINI DE FIGUEIREDO','23C');
select public.criar_usuario('2043220072@maristabrasil.g12.br','Marista@2026','2043220072','MANUELA MONTÓN DA COSTA','23C');
select public.criar_usuario('2043240217@maristabrasil.g12.br','Marista@2026','2043240217','MARIA CLARA LOPES DE OLIVEIRA SILVA','23C');
select public.criar_usuario('2043150319@maristabrasil.g12.br','Marista@2026','2043150319','MARIA CLARA SOUZA LAROCCA RIGAILO','23C');
select public.criar_usuario('2043160385@maristabrasil.g12.br','Marista@2026','2043160385','MARINA ROCHA CABRAL','23C');
select public.criar_usuario('2043220021@maristabrasil.g12.br','Marista@2026','2043220021','PEDRO LIMA SARMANHO','23C');
select public.criar_usuario('2043200132@maristabrasil.g12.br','Marista@2026','2043200132','SAMUEL VAZ COUTINHO','23C');
select public.criar_usuario('2043160020@maristabrasil.g12.br','Marista@2026','2043160020','SARAH BRANDÃO XUDRÉ BRITO','23C');
select public.criar_usuario('2043150303@maristabrasil.g12.br','Marista@2026','2043150303','THIAGO QUEIROZ RIBEIRO','23C');

-- ============================================================
-- VERIFICAÇÃO FINAL
-- ============================================================
select role, count(*) as total
from public.perfis
group by role;

select turma, count(*) as total
from public.perfis
where role = 'aluno'
group by turma
order by turma;

-- Lista completa para conferência
select turma, matricula, nome, email, senha_trocada
from public.perfis
where role = 'aluno'
order by turma, nome;
