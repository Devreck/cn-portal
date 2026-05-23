# Deploy, Backup e Homologacao

Este projeto e um site estatico que usa Supabase para banco, Auth e Edge Functions.

## Modelo recomendado

Use tres camadas:

1. `producao`: site usado pelos estudantes e Supabase de producao.
2. `homologacao`: copia para testar mudancas antes de publicar.
3. `backup`: arquivo local dos arquivos do site e dump do banco antes de qualquer alteracao relevante.

O mais seguro e ter dois projetos/branches Supabase:

- Producao: projeto atual `uupwqztczuryouhpiblx`.
- Homologacao: outro projeto Supabase ou um branch persistente/preview do Supabase.

Nunca teste migracoes de banco diretamente no projeto de producao.

## Antes de publicar qualquer atualizacao

```bash
cd ~/Documents/revisaoprojeto/cn-portal

# 1. Validar sintaxe local
bash scripts/check-static.sh

# 2. Backup dos arquivos do site
bash scripts/backup-files.sh

# 3. Backup do banco
bash scripts/backup-db.sh
```

Se a Supabase CLI pedir Docker, abra o Docker Desktop antes de rodar o backup.

Alternativa sem Docker: instalar `pg_dump` e usar a connection string do banco.

```bash
brew install libpq
brew link --force libpq
```

Depois, use:

```bash
export SUPABASE_DB_URL='postgresql://...'
bash scripts/backup-db.sh
```

Guarde os arquivos da pasta `backups/` fora do repositorio, porque podem conter dados pessoais dos estudantes.

## Homologacao do frontend

O arquivo `config.js` agora concentra o ambiente Supabase.

Em producao, ele usa:

```js
CN_CONFIG.ambiente === 'producao'
```

Para homologacao, preencha em `config.js`:

```js
homologacao: {
  url: 'https://SEU-PROJETO-HOMOLOGACAO.supabase.co',
  anonKey: 'SUA_CHAVE_ANON_OU_PUBLISHABLE',
}
```

O ambiente de homologacao e ativado automaticamente se o dominio contiver `staging`, `homolog` ou `preview`.

Para testar localmente contra homologacao:

```js
localStorage.setItem('cn_env', 'homologacao')
location.reload()
```

Para voltar:

```js
localStorage.removeItem('cn_env')
location.reload()
```

## Deploy do site estatico

Opcoes simples:

- Netlify: publicar a pasta raiz `cn-portal/`, sem comando de build.
- Vercel: projeto estatico, framework `Other`, output na raiz.
- GitHub Pages: publicar a branch principal ou uma pasta configurada.

Use dois sites:

- `cn-portal-staging` apontando para branch de homologacao.
- `cn-portal` apontando para branch de producao.

Fluxo:

1. Subir alteracoes em uma branch de teste.
2. Publicar/abrir preview.
3. Conferir login, revisao, IA, fila do professor, simulado e contador.
4. Fazer backup do banco de producao.
5. Aplicar migracoes aprovadas no banco de producao.
6. Promover o frontend para producao.

## Banco de dados

Daqui em diante, toda mudanca de banco deve virar arquivo SQL versionado antes de ser executada.

Fluxo seguro:

1. Criar SQL novo em `supabase/`.
2. Testar no Supabase de homologacao.
3. Conferir RLS com usuario aluno e professor.
4. Fazer backup da producao.
5. Aplicar na producao.

Para mudancas destrutivas, use sempre duas etapas:

1. Criar coluna/tabela nova e migrar dados.
2. So remover coluna/tabela antiga depois de confirmar que o site novo esta em producao.

## Edge Function Gemini

Deploy em homologacao:

```bash
supabase functions deploy gemini --project-ref REF_HOMOLOGACAO
supabase secrets set GEMINI_API_KEY='NOVA_CHAVE' --project-ref REF_HOMOLOGACAO
```

Deploy em producao:

```bash
supabase functions deploy gemini --project-ref uupwqztczuryouhpiblx
supabase secrets set GEMINI_API_KEY='NOVA_CHAVE' --project-ref uupwqztczuryouhpiblx
```

Use chaves Gemini diferentes para homologacao e producao quando possivel.

## Observacao de seguranca

A chave `anon`/`publishable` do Supabase pode ficar no frontend, desde que as politicas RLS estejam corretas.

Chaves secretas, como `service_role` e `GEMINI_API_KEY`, nunca devem ir para HTML, JS publico ou repositorio.
