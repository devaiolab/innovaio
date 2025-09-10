import { useState, useCallback } from "react";

export interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: "competition" | "regulation" | "technology" | "security";
  intensity: "low" | "medium" | "high";
  duration: number; // minutes
  alerts: AlertData[];
  impacts: {
    revenue: number;
    market_share: number;
    operational_risk: number;
    customer_satisfaction: number;
  };
}

const scenarioTemplates: Record<string, Scenario> = {
  nucel_mvno_threat: {
    id: "nucel_mvno_threat",
    name: "NuCel: MVNO Disruptivo do Nubank",
    description: "Nubank lança NuCel com estratégia MVNO agressiva, combinando serviços financeiros e telecom",
    category: "competition",
    intensity: "high",
    duration: 35,
    alerts: [
      {
        id: "nc-1",
        type: "red",
        title: "ALERTA: NuCel Lança MVNO com Combos Financeiros",
        description: "Nubank oficializa NuCel: planos pré-pagos R$ 25/mês com benefícios exclusivos para 90M+ clientes. Combo cartão + conta + celular.",
        region: "Brasil",
        urgency: 95,
        timestamp: new Date(),
      },
      {
        id: "nc-2",
        type: "red",
        title: "ESTRATÉGIA: Super App Nubank Completo",
        description: "NuCel integra cashback, Pix grátis ilimitado e descontos no Nubank Shopping. Ecossistema completo financeiro + telecom.",
        region: "São Paulo",
        urgency: 92,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: "nc-3",
        type: "yellow",
        title: "AMEAÇA: ISPs Regionais Sem Resposta",
        description: "ISPs tradicionais não possuem portfólio de serviços financeiros para competir com combos Nubank. Gap estratégico crítico.",
        region: "São Bernardo do Campo",
        urgency: 88,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: "nc-4",
        type: "blue",
        title: "OPORTUNIDADE: Athon Telecom MVNO",
        description: "Janela para Athon desenvolver MVNO próprio com foco em combos internet + mobile para base instalada ABC.",
        region: "São Bernardo do Campo",
        urgency: 85,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ],
    impacts: {
      revenue: -22,
      market_share: -18,
      operational_risk: 40,
      customer_satisfaction: -15,
    },
  },
  starlink_expansion: {
    id: "starlink_expansion",
    name: "Starlink Expansão Agressiva",
    description: "Starlink inicia campanha agressiva de preços em São Bernardo do Campo",
    category: "competition",
    intensity: "high",
    duration: 30,
    alerts: [
      {
        id: "s1-1",
        type: "red",
        title: "CENÁRIO: Starlink Corta Preços 40%",
        description: "Starlink oferece R$ 99/mês por 6 meses na região ABC. Campanha direcionada para clientes de ISPs locais.",
        region: "São Bernardo do Campo",
        urgency: 98,
        timestamp: new Date(),
      },
      {
        id: "s1-2",
        type: "red",
        title: "CENÁRIO: Clientes Athon Cancelando",
        description: "15% dos clientes residenciais cancelaram nas últimas 48h. Call center reporta alta procura por informações sobre Starlink.",
        region: "São Bernardo do Campo",
        urgency: 92,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: "s1-3",
        type: "yellow",
        title: "CENÁRIO: Mídia Local Amplifica",
        description: "Jornal ABC Today destaca oferta Starlink. Trending #StarlinkaBC no Twitter com 12k menções em 4 horas.",
        region: "São Bernardo do Campo",
        urgency: 85,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ],
    impacts: {
      revenue: -25,
      market_share: -15,
      operational_risk: 35,
      customer_satisfaction: -20,
    },
  },
  regulatory_crisis: {
    id: "regulatory_crisis",
    name: "Crise Regulatória 5G",
    description: "ANATEL muda regras de compartilhamento de infraestrutura",
    category: "regulation",
    intensity: "high",
    duration: 45,
    alerts: [
      {
        id: "s2-1",
        type: "red",
        title: "CENÁRIO: ANATEL Resolução Emergencial",
        description: "Resolução 888/2025 obriga ISPs regionais a compartilhar 70% da infraestrutura com grandes operadoras. Prazo: 90 dias.",
        region: "Brasil",
        urgency: 96,
        timestamp: new Date(),
      },
      {
        id: "s2-2",
        type: "red",
        title: "CENÁRIO: Custos Operacionais +65%",
        description: "Compartilhamento forçado eleva custos de manutenção. ROI de novos investimentos despenca para 3.2 anos.",
        region: "São Bernardo do Campo",
        urgency: 89,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: "s2-3",
        type: "yellow",
        title: "CENÁRIO: Movimento dos ISPs Regionais",
        description: "Sindicato dos ISPs Regionais articula ação judicial coletiva. 127 empresas já aderiram à contestação.",
        region: "São Paulo",
        urgency: 78,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
    impacts: {
      revenue: -18,
      market_share: -12,
      operational_risk: 45,
      customer_satisfaction: -8,
    },
  },
  price_war: {
    id: "price_war",
    name: "Guerra de Preços Local",
    description: "Concorrentes locais iniciam guerra de preços na região ABC",
    category: "competition",
    intensity: "medium",
    duration: 25,
    alerts: [
      {
        id: "s3-1",
        type: "yellow",
        title: "CENÁRIO: Topnet Corta 30% dos Preços",
        description: "Topnet anuncia plano 500Mbps por R$ 79,90 na região ABC. Campanha 'Velocidade Real, Preço Real'.",
        region: "São Bernardo do Campo",
        urgency: 87,
        timestamp: new Date(),
      },
      {
        id: "s3-2",
        type: "yellow",
        title: "CENÁRIO: K2 Network Responde",
        description: "K2 Network lança combo fibra + streaming por R$ 69,90. Inclui Netflix e Prime Video por 12 meses.",
        region: "Santo André",
        urgency: 83,
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
      },
      {
        id: "s3-3",
        type: "blue",
        title: "CENÁRIO: Oportunidade Diferenciação",
        description: "Competidores focam em preço. Janela para posicionamento premium com serviços de valor agregado.",
        region: "São Bernardo do Campo",
        urgency: 72,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ],
    impacts: {
      revenue: -12,
      market_share: -8,
      operational_risk: 20,
      customer_satisfaction: 5,
    },
  },
  cyber_attack: {
    id: "cyber_attack",
    name: "Ataque Cibernético",
    description: "Ataque coordenado à infraestrutura de ISPs regionais",
    category: "security",
    intensity: "high",
    duration: 60,
    alerts: [
      {
        id: "s4-1",
        type: "red",
        title: "CENÁRIO: DDoS Massivo em Andamento",
        description: "Ataque DDoS de 2.4 Tbps atinge ISPs da região ABC. Origem: botnet com 50k+ dispositivos IoT comprometidos.",
        region: "São Bernardo do Campo",
        urgency: 99,
        timestamp: new Date(),
      },
      {
        id: "s4-2",
        type: "red",
        title: "CENÁRIO: Infraestrutura Crítica Off",
        description: "35% dos POPs regionais offline. Tráfego sendo reroteado causa congestionamento em links de backup.",
        region: "São Bernardo do Campo",
        urgency: 94,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: "s4-3",
        type: "red",
        title: "CENÁRIO: Mídia Nacional Repercute",
        description: "Globo e Band destacam 'apagão digital no ABC'. Clientes reportam impossibilidade de home office.",
        region: "São Paulo",
        urgency: 88,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
    ],
    impacts: {
      revenue: -8,
      market_share: 3,
      operational_risk: 75,
      customer_satisfaction: -35,
    },
  },
};

export const useScenarioData = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [simulationStartTime, setSimulationStartTime] = useState<Date | null>(null);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [scenarioHistory, setScenarioHistory] = useState<string[]>([]);

  const startScenario = useCallback((scenarioId: string, intensity: "low" | "medium" | "high") => {
    const template = scenarioTemplates[scenarioId];
    if (!template) return;

    const scenario: Scenario = {
      ...template,
      intensity,
      impacts: {
        revenue: template.impacts.revenue * (intensity === "low" ? 0.5 : intensity === "medium" ? 1 : 1.5),
        market_share: template.impacts.market_share * (intensity === "low" ? 0.5 : intensity === "medium" ? 1 : 1.5),
        operational_risk: template.impacts.operational_risk * (intensity === "low" ? 0.5 : intensity === "medium" ? 1 : 1.5),
        customer_satisfaction: template.impacts.customer_satisfaction * (intensity === "low" ? 0.5 : intensity === "medium" ? 1 : 1.5),
      },
    };

    setActiveScenario(scenario);
    setIsSimulationActive(true);
    setSimulationStartTime(new Date());
    setScenarioHistory(prev => [...prev, `${scenario.name} (${intensity.toUpperCase()})`]);
  }, []);

  const stopScenario = useCallback(() => {
    setActiveScenario(null);
    setIsSimulationActive(false);
    setSimulationStartTime(null);
  }, []);

  const getScenarioAlerts = useCallback(() => {
    if (!activeScenario || !isSimulationActive) return [];
    return activeScenario.alerts;
  }, [activeScenario, isSimulationActive]);

  const getScenarioMetrics = useCallback(() => {
    if (!activeScenario || !isSimulationActive) return null;
    
    return {
      scenario: activeScenario,
      runtime: simulationStartTime ? Math.floor((Date.now() - simulationStartTime.getTime()) / 1000) : 0,
      speed: simulationSpeed,
    };
  }, [activeScenario, isSimulationActive, simulationStartTime, simulationSpeed]);

  return {
    activeScenario,
    isSimulationActive,
    simulationSpeed,
    scenarioHistory,
    scenarioTemplates,
    startScenario,
    stopScenario,
    setSimulationSpeed,
    getScenarioAlerts,
    getScenarioMetrics,
  };
};