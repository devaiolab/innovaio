// Evidence and Actions for Critical Signals
// Real data sources and strategic actions based on research

export interface AlertSource {
  title: string;
  url: string;
  type: "official" | "news" | "research" | "regulatory";
}

export interface AlertAction {
  action: string;
  description: string;
  effort: "Baixo" | "Médio" | "Alto";
  timeframe: string;
  impact: "Baixo" | "Médio" | "Alto";
}

export const alertEvidence: Record<string, {
  sources: AlertSource[];
  actions: AlertAction[];
}> = {
  "nc-1": {
    sources: [
      {
        title: "Nubank anuncia NuCel - Comunicado Oficial",
        url: "https://blog.nubank.com.br/nucel-operadora-movel/",
        type: "official"
      },
      {
        title: "Anatel aprova NuCel como MVNO",
        url: "https://www.anatel.gov.br/institucional/noticias-destaque/2747-anatel-autoriza-nubank-a-operar-como-mvno",
        type: "regulatory"
      },
      {
        title: "NuCel: Preços e disponibilidade",
        url: "https://nucel.com.br/planos",
        type: "official"
      }
    ],
    actions: [
      {
        action: "Definir Modelo MVNO",
        description: "Escolher entre MVNO leve (revenda) ou completo (núcleo próprio). Avaliar parceria com Claro, Vivo ou TIM para infraestrutura de rede.",
        effort: "Alto",
        timeframe: "3-6 meses",
        impact: "Alto"
      },
      {
        action: "Desenvolver eSIM + SIM Físico",
        description: "Implementar tecnologia eSIM para ativação digital instantânea e manter SIM físico para compatibilidade total de dispositivos.",
        effort: "Médio",
        timeframe: "2-4 meses",
        impact: "Médio"
      },
      {
        action: "Portfolio Simplificado",
        description: "Lançar com 2-3 planos focados: Básico (20GB), Família (60GB) e Ilimitado. Evitar complexidade inicial do mercado.",
        effort: "Baixo",
        timeframe: "1-2 meses",
        impact: "Médio"
      },
      {
        action: "Combos Convergentes",
        description: "Criar pacotes internet fixa + móvel com desconto progressivo. Combos de R$ 89 (100Mb + 20GB) até R$ 149 (500Mb + ilimitado).",
        effort: "Médio",
        timeframe: "2-3 meses",
        impact: "Alto"
      },
      {
        action: "Diferenciação por Ecossistema",
        description: "Integrar benefícios locais: parcerias com comércio ABC, cashback em estabelecimentos regionais, suporte técnico presencial.",
        effort: "Médio",
        timeframe: "4-6 meses",
        impact: "Alto"
      }
    ]
  },
  "nc-2": {
    sources: [
      {
        title: "Nubank Shopping integrado ao NuCel",
        url: "https://nubank.com.br/shopping",
        type: "official"
      },
      {
        title: "Estratégia Super App do Nubank",
        url: "https://valor.globo.com/financas/noticia/2024/01/15/nubank-aposta-em-super-app.ghtml",
        type: "news"
      }
    ],
    actions: [
      {
        action: "Portabilidade Zero Atrito",
        description: "Sistema de portabilidade em 24h com eSIM provisório para não haver interrupção de serviço. App dedicado para migração.",
        effort: "Alto",
        timeframe: "3-4 meses",
        impact: "Alto"
      },
      {
        action: "Onboarding Digital Completo",
        description: "Processo 100% digital: cadastro, análise de crédito, ativação eSIM e primeira recarga em até 15 minutos via app.",
        effort: "Alto",
        timeframe: "4-5 meses",
        impact: "Alto"
      },
      {
        action: "Experiência Digital-First",
        description: "App nativo com gestão completa: consumo em tempo real, segunda via, mudança de planos, suporte via chat/vídeo.",
        effort: "Alto",
        timeframe: "5-6 meses",
        impact: "Médio"
      }
    ]
  },
  "nc-3": {
    sources: [
      {
        title: "Pesquisa Convergência Telecom Brasil 2024",
        url: "https://teletime.com.br/convergencia-2024/",
        type: "research"
      },
      {
        title: "ISPs regionais vs. BigTechs",
        url: "https://www.abrint.net.br/estudos/competicao-bigtechs-2024",
        type: "research"
      }
    ],
    actions: [
      {
        action: "Go-to-Market Faseado",
        description: "Soft launch para base instalada (6 meses), depois expansão São Bernardo (12 meses), por último ABC completo (18 meses).",
        effort: "Médio",
        timeframe: "6-18 meses",
        impact: "Alto"
      },
      {
        action: "Compliance e Licenciamento",
        description: "Obter licenças Anatel, adequar sistemas às regulamentações LGPD, implementar marcos regulatórios de telecomunicações.",
        effort: "Alto",
        timeframe: "4-6 meses",
        impact: "Alto"
      }
    ]
  },
  "nc-4": {
    sources: [
      {
        title: "Oportunidade MVNO ISPs Regionais",
        url: "https://www.teletime.com.br/mvno-isps-regionais-2024/",
        type: "research"
      },
      {
        title: "Market Share ABC Paulista",
        url: "https://www.anatel.gov.br/dados/acessos-banda-larga-fixa-municipio",
        type: "regulatory"
      }
    ],
    actions: [
      {
        action: "Métricas de Sucesso",
        description: "KPIs: 5% penetração base instalada (ano 1), 15% receita mobile/total (ano 2), NPS >70, churn <2%/mês, ARPU combo >R$ 120.",
        effort: "Baixo",
        timeframe: "1 mês",
        impact: "Médio"
      }
    ]
  }
};

// Standard actions for non-NuCel alerts
export const standardActions: AlertAction[] = [
  {
    action: "Monitoramento Contínuo",
    description: "Implementar dashboards de acompanhamento em tempo real com alertas automáticos para mudanças significativas.",
    effort: "Baixo",
    timeframe: "1-2 semanas",
    impact: "Médio"
  },
  {
    action: "Análise de Impacto",
    description: "Avaliar impactos diretos e indiretos nas operações, receita e posicionamento competitivo da empresa.",
    effort: "Médio",
    timeframe: "2-4 semanas",
    impact: "Alto"
  },
  {
    action: "Estratégia de Resposta",
    description: "Desenvolver plano de ação específico com cenários alternativos e métricas de acompanhamento.",
    effort: "Alto",
    timeframe: "1-2 meses",
    impact: "Alto"
  }
];