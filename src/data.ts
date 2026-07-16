import { PainPoint, MethodPillar, TimelineStep, BenefitItem, SuccessCase, FAQItem } from './types';

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'pain-1',
    icon: 'TrendingDown',
    title: 'Vendas Reféns do Mercado Aquecido',
    explanation: 'Sua equipe vende bem quando o setor está em alta e trava assim que o mercado esfria — porque nunca teve um método próprio de vender, só surfou a onda do boom solar.',
    consequence: 'Faturamento imprevisível e equipe sem repertório pra vender em qualquer cenário.'
  },
  {
    id: 'pain-2',
    icon: 'Users',
    title: 'Vendedor Trava na Hora da Objeção',
    explanation: "'Vou pesquisar mais', 'vou pensar no financiamento', 'achei caro' — sua equipe ouve isso toda semana e não tem um script pra virar o jogo, só desconto.",
    consequence: 'Venda perdida por falta de resposta, não por falta de interesse do cliente.'
  },
  {
    id: 'pain-3',
    icon: 'Coins',
    title: 'Guerra de Preço Entre Integradores',
    explanation: 'Outro integrador oferece o mesmo sistema por menos, e seu vendedor não sabe defender o valor da sua entrega — só sabe baixar o preço.',
    consequence: 'Margem esmagada e instalação virando commodity.'
  },
  {
    id: 'pain-4',
    icon: 'Flame',
    title: 'Treinamento Pontual Que Não Vira Hábito',
    explanation: 'Você já contratou palestra ou workshop avulso, o time animou por uma semana e voltou ao mesmo de sempre — porque treinamento sem constância não muda comportamento.',
    consequence: 'Dinheiro gasto em capacitação que não se sustenta depois do primeiro mês.'
  }
];

export const METHOD_PILLARS: MethodPillar[] = [
  {
    id: 'pillar-1',
    icon: 'Target',
    name: 'Formação Comercial Contínua',
    explanation: 'Treinamentos ao vivo toda semana — planejamento de meta, prospecção, abordagem, negociação, fechamento, neurocomunicação e oratória — direto com quem já validou o método em grandes empresas do setor solar.',
    benefit: 'Sua equipe evolui todo mês, não só numa palestra isolada.'
  },
  {
    id: 'pillar-2',
    icon: 'Filter',
    name: 'Plataforma de Treinamento',
    explanation: 'Você não precisa se preocupar com treinamentos para vendedores novatos.',
    benefit: 'Acelere o onboarding de novos comerciais sem drenar seu tempo.'
  },
  {
    id: 'pillar-3',
    icon: 'Zap',
    name: 'Comunidade e Suporte de Crescimento',
    explanation: 'Acesso à Comunidade Cultura — rede fechada com os principais integradores do país trocando resultado — mais suporte estratégico pra estruturar o crescimento da sua empresa nos 3 níveis: estratégico, tático e operacional.',
    benefit: 'Você não aprende sozinho — evolui junto com quem já está mais à frente.'
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: '01',
    title: 'Diagnóstico Comercial de Entrada',
    description: 'Avaliamos o nível atual do seu time: script, postura, taxa de fechamento e maiores gargalos na venda de solar.',
    tag: 'Fase de Diagnóstico',
    metric: 'Avaliação em 7 dias'
  },
  {
    number: '02',
    title: 'Trilha de Formação ao Vivo',
    description: 'Seu time entra nos treinamentos semanais e recebe os scripts de vendas e comunicação aplicados ao setor solar.',
    tag: 'Fase de Formação',
    metric: 'Treinos toda semana'
  },
  {
    number: '03',
    title: 'Aplicação com Comunidade',
    description: 'O time aplica o que aprendeu nas vendas reais da semana e tira dúvida direto na Comunidade Cultura com outros integradores.',
    tag: 'Fase de Prática',
    metric: 'Suporte contínuo'
  },
  {
    number: '04',
    title: 'Evolução Mensal e Resultado',
    description: 'Todo mês o ciclo se repete: novo conteúdo, novo treino, novo suporte — e o ticket médio fechado pelo seu time sobe de forma constante.',
    tag: 'Fase de Escala',
    metric: 'Evolução contínua'
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'benefit-1',
    title: 'Treinamentos ao Vivo Toda Semana',
    description: 'Aulas semanais com o método testado da Cultura de Vendas, direto e aplicável ao seu dia a dia comercial.',
    isPremium: true
  },
  {
    id: 'benefit-2',
    title: 'Plataforma + Certificado',
    description: 'Acesso à plataforma por 1 ano e certificado de conclusão ao final do programa.',
    isPremium: true
  },
  {
    id: 'benefit-3',
    title: 'Scripts Prontos Pro Setor Solar',
    description: 'Scripts de abordagem, negociação e fechamento específicos pras objeções que só quem vende solar escuta.'
  },
  {
    id: 'benefit-4',
    title: 'Comunidade Fechada de Integradores',
    description: 'Grupo de network com os principais integradores do segmento, trocando o que está funcionando agora.'
  },
  {
    id: 'benefit-5',
    title: 'Suporte Estratégico de Crescimento',
    description: 'Orientação nos 3 pilares da sua empresa — estratégico, tático e operacional — pra crescer com solidez, não só na sorte.',
    isPremium: true
  },
  {
    id: 'benefit-6',
    title: 'Conteúdo Sempre Atualizado',
    description: 'Todo mês entra conteúdo novo — por isso é assinatura, não curso parado que fica desatualizado.'
  }
];

export const SUCCESS_CASES: SuccessCase[] = [
  {
    id: 'case-img-1',
    type: 'image',
    clientName: 'Alessandra R Cunha',
    niche: 'Piauí',
    metric: 'R$ 600k/mês',
    title: 'Saiu de um faturamento mensal de 300.000 para mais de 600.000 ao mês',
    content: 'Integrador aplicando o roteiro de objeção de preço e fechando o projeto sem dar descontos adicionais.',
    imageUrl: 'https://lh3.googleusercontent.com/d/14bp1MClIryieRiwQY8ENO7Ywx_4ZcFxc'
  },
  {
    id: 'case-img-2',
    type: 'image',
    clientName: 'Wellinton Braspower',
    niche: 'Goiás',
    metric: 'Constante',
    title: 'Saiu de um faturamento médio de 700.000/mes resultado constante',
    content: 'Seguindo as estratégias de prospecção ativa e abordagem comercial de alto ticket.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1qatlOo2afudUc18RvbZOiPHEPBb0GPF4'
  },
  {
    id: 'case-img-3',
    type: 'image',
    clientName: 'Raimundo',
    niche: 'GDX',
    metric: '15 dias',
    title: 'Mais de 100,000 em apenas 15 dias de processo',
    content: 'Utilizando a neurocomunicação e ancoragem de benefícios ensinada nos nossos treinamentos semanais.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1EpKFzyxKdrKq7ykuQiGfDtOmtul-BubD'
  },
  {
    id: 'case-img-4',
    type: 'image',
    clientName: 'Gabriel Sansol',
    niche: 'Belém',
    metric: 'R$ 20M+ Faturados',
    title: 'Mais de 20 milhões faturados.',
    content: 'Aceleração de resultados e qualificação da equipe comercial de vendas com o método Cultura de Vendas.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1DL3QiGcKV8k8AhRfPnl-UR34Q4VMCvqK'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Pra quem é o Squad?',
    answer: 'O Squad foi desenhado pra donos de integradoras solares, vendedores e times comerciais do setor de energia solar que querem parar de vender por sorte ou boom de mercado e passar a vender com método, todo mês.'
  },
  {
    id: 'faq-2',
    question: 'Preciso já ter experiência em vendas pra entrar?',
    answer: 'Não. O Squad ensina do básico (planejamento de meta, prospecção, abordagem) até o avançado (negociação, neurocomunicação, fechamento de alto ticket), então serve tanto pra quem está começando quanto pra quem já vende há anos.'
  },
  {
    id: 'faq-3',
    question: 'Posso cancelar quando quiser?',
    answer: 'Sim. É uma assinatura mensal de R$347,90 (com preço promocional ativo de R$897,90 por R$347,90) — sem fidelidade. Você paga mês a mês e cancela quando quiser, sem burocracia.'
  },
  {
    id: 'faq-4',
    question: 'Em quanto tempo vejo resultado no meu time comercial?',
    answer: 'Os treinamentos são ao vivo semanalmente e os scripts já podem ser aplicados na próxima venda. Times que aplicam de forma consistente costumam sentir diferença na taxa de fechamento já nas primeiras semanas.'
  },
  {
    id: 'faq-5',
    question: 'Existe garantia?',
    answer: 'Sim. Se em 7 dias você sentir que o Squad não é pra você, devolvemos seu investimento — sem perguntas.'
  }
];
