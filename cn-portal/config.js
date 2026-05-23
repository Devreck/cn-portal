// ============================================================
// CN PORTAL MARISTA — CONFIGURAÇÃO CENTRAL
// Único arquivo que contém as credenciais do projeto.
// Todos os outros arquivos importam daqui.
// ============================================================

const CN_ENV = (() => {
  const host = window.location.hostname;
  const forced = window.localStorage?.getItem('cn_env');
  if (forced === 'homologacao' || forced === 'producao') return forced;
  if (host.includes('staging') || host.includes('homolog') || host.includes('preview')) return 'homologacao';
  return 'producao';
})();

const CN_AMBIENTES = {
  producao: {
    url: 'https://uupwqztczuryouhpiblx.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1cHdxenRjenVyeW91aHBpYmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0Nzk0ODEsImV4cCI6MjA5NTA1NTQ4MX0.sCI-8Qz0I4zIIOHyd8Xq3zdSO6gHV18ZYD_VMXnST0M',
  },
  homologacao: {
    // Preencha quando criar o projeto/branch de homologação no Supabase.
    // Nunca coloque service_role aqui. Use apenas a chave anon/publishable.
    url: '',
    anonKey: '',
  },
};

const CN_AMBIENTE_ATIVO = CN_AMBIENTES[CN_ENV]?.url ? CN_ENV : 'producao';

const CN_CONFIG = {
  ambiente: CN_AMBIENTE_ATIVO,
  ambienteSolicitado: CN_ENV,
  ambientes: CN_AMBIENTES,
  supabase: CN_AMBIENTES[CN_AMBIENTE_ATIVO],

  createSupabaseClient() {
    if (!window.supabase?.createClient) {
      throw new Error('Biblioteca Supabase não carregada.');
    }
    return window.supabase.createClient(this.supabase.url, this.supabase.anonKey);
  },

  // Rotas do portal
  rotas: {
    login:       'index.html',
    trocarSenha: 'trocar-senha.html',
    portal:      'portal.html',
    revisao:     'revisao.html',
    simulado:    'simulado.html',
    ranking:     'ranking.html',
    painel:      'painel.html',
  },

  // Pontuação
  pontuacao: {
    tipoA_acerto:        10,   // Certo/Errado correto
    tipoC_acerto:        20,   // Múltipla escolha correto
    simulado_acerto:     15,   // Qualquer item do simulado
    bonus_conclusao_dis: 100,  // Completar uma disciplina
    bonus_conclusao_3:   500,  // Completar as 3 revisões
    bonus_simulado:      200,  // Concluir o simulado
    bonus_gabarito:      300,  // 100% em uma disciplina
    streak_min:          5,    // Streak mínimo para multiplicador
    streak_mult_5:       1.5,  // ×1.5 a partir de 5 seguidos
    streak_mult_10:      2.0,  // ×2.0 a partir de 10 seguidos
  },

  // Badges
  badges: [
    { id: 'primeiro_acesso',     emoji: '🚀', nome: 'Primeiro Acesso',        desc: 'Entrou no portal pela primeira vez' },
    { id: 'dna_ativo',           emoji: '🧬', nome: 'DNA Ativo',              desc: 'Completou a revisão de Biologia' },
    { id: 'reacao_em_cadeia',    emoji: '⚗️', nome: 'Reação em Cadeia',       desc: 'Completou a revisão de Química' },
    { id: 'forca_total',         emoji: '⚡', nome: 'Força Total',            desc: 'Completou a revisão de Física' },
    { id: 'triforce',            emoji: '🔱', nome: 'Triforce',               desc: 'Completou as 3 revisões' },
    { id: 'simulado_desbloq',    emoji: '🔓', nome: 'Simulado Desbloqueado', desc: 'Acessou o simulado pela primeira vez' },
    { id: 'sobrevivente',        emoji: '🎯', nome: 'Sobrevivente',           desc: 'Concluiu o simulado' },
    { id: 'streak_fogo',         emoji: '🔥', nome: 'Streak de Fogo',        desc: '10 acertos consecutivos' },
    { id: 'perfeccionista',      emoji: '💎', nome: 'Perfeccionista',         desc: '100% em qualquer disciplina' },
    { id: 'mestre_genetica',     emoji: '🧬', nome: 'Mestre da Genética',    desc: '90%+ nas questões de Biologia' },
    { id: 'expert_eletroquimica',emoji: '⚗️', nome: 'Expert em Eletroquímica',desc: '90%+ nas questões de Química' },
    { id: 'senhor_joule',        emoji: '⚡', nome: 'Senhor do Efeito Joule', desc: '90%+ nas questões de Física' },
    { id: 'maratonista',         emoji: '⏱️', nome: 'Maratonista',           desc: '2 horas no portal' },
    { id: 'consistente',         emoji: '📅', nome: 'Consistente',           desc: 'Acessou 3 dias seguidos' },
    { id: 'top3',                emoji: '🥇', nome: 'Top 3',                  desc: 'Entrou no top 3 do ranking' },
    { id: 'lenda_marista',       emoji: '👑', nome: 'Lenda Marista',          desc: 'Conquistou todos os outros badges' },
  ],

  // Disciplinas
  disciplinas: {
    bio:  { nome: 'Biologia',  emoji: '🧬', cor: '#22c55e', corBg: 'rgba(34,197,94,0.08)' },
    quim: { nome: 'Química',   emoji: '⚗️', cor: '#f59e0b', corBg: 'rgba(245,158,11,0.08)' },
    fis:  { nome: 'Física',    emoji: '⚡', cor: '#3b82f6', corBg: 'rgba(59,130,246,0.08)' },
    inter:{ nome: 'Inter.',    emoji: '🔬', cor: '#a855f7', corBg: 'rgba(168,85,247,0.08)' },
  },
};

window.CN_CONFIG = CN_CONFIG;
