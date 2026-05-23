# 📦 Estrutura do Projeto - CN Portal Marista

## 📂 Arquivos Essenciais

```
cn-portal/
├── 📄 index.html                 ← Login (página principal)
├── 📄 trocar-senha.html          ← Página de troca de senha
├── 📄 diagnostico.html           ← Diagnóstico do sistema
├── 📄 create-users.html          ← Interface para criar usuários ⭐
├── ⚙️  config.js                  ← Configuração Supabase (ESSENCIAL)
├── 📖 INICIO_RAPIDO.md           ← Guia rápido de início
│
└── 📁 supabase/
    ├── 01_schema.sql             ← Estrutura do banco de dados
    ├── 02_rls.sql                ← Políticas de segurança (Row Level Security)
    └── 03_seed.sql               ← Trigger automático de sincronização
```

---

## 🚀 Como Usar

### 1. Configurar Banco de Dados

Execute no **Supabase SQL Editor** nesta ordem:

1. `supabase/01_schema.sql` - Cria tabelas
2. `supabase/02_rls.sql` - Define segurança
3. `supabase/03_seed.sql` - Cria trigger automático

### 2. Criar Usuários de Teste

Abra no navegador: `create-users.html`

Clique em:
- ✅ "Criar Professores"
- ✅ "Criar Alunos"

### 3. Testar Login

Abra: `index.html`

Use credenciais:
- Email: `deyko.teixeira@maristabrasil.org`
- Senha: `Marista@2026Professor`

---

## 📋 Descrição dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página de login principal - aba "Sou Professor" e "Sou Aluno" |
| `trocar-senha.html` | Página para trocar senha (primeira autenticação) |
| `diagnostico.html` | Página de diagnóstico do sistema |
| `create-users.html` | **Interface para criar usuários** - USE ESTE! |
| `config.js` | Credenciais Supabase e configurações globais |
| `INICIO_RAPIDO.md` | Guia rápido de início |

---

## 📊 Estrutura de Usuários

### Professores
```
Email:   deyko.teixeira@maristabrasil.org
Senha:   Marista@2026Professor
Matrícula: PROF001
```

### Alunos
```
Email:   2043260353@maristabrasil.g12.br
Senha:   Marista@2026
Matrícula: 2043260353
Turma:   23A
```

---

## 🔐 Configuração Supabase

- **URL do Projeto**: `https://uupwqztczuryouhpiblx.supabase.co`
- **Configuração**: Em `config.js`
- **Tabelas Principais**: `auth.users`, `public.perfis`

---

## ✅ Checklist de Setup

- [ ] Executar scripts SQL no Supabase
- [ ] Abrir `create-users.html`
- [ ] Criar professores e alunos
- [ ] Testar login em `index.html`
- [ ] Verificar redirecionamentos:
  - Primeira vez → `trocar-senha.html`
  - Depois → `portal.html` (aluno) ou `painel.html` (professor)

---

**Projeto limpo e otimizado! ✨**
