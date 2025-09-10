import { useState, useEffect } from "react";
import { InteractiveGlobeDemo } from "./InteractiveGlobeDemo";
import { GlobalPulseInfo } from "./GlobalPulseInfo";
import { Navigation } from "./Navigation";
import { CriticalSignals } from "./CriticalSignals";
import { LocalMarketData } from "./LocalMarketData";
import { ScenarioSelector } from "./ScenarioSelector";
import { ScenarioControls } from "./ScenarioControls";
import { ImpactAnalysis } from "./ImpactAnalysis";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Globe, Zap } from "lucide-react";
import { useScenarioData } from "@/hooks/useScenarioData";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

const mockAlerts: AlertData[] = [
  // CRÍTICOS - Ameaças Imediatas
  {
    id: "1",
    type: "red",
    title: "Breakthrough Quântico - Criptografia RSA",
    description: "Cientistas chineses da Universidade de Shanghai conseguiram quebrar criptografia RSA de 90-bit usando computação quântica. Ameaça real para sistemas bancários e militares globais.",
    region: "China",
    urgency: 95,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  // === ALERTAS NUCEL - AMEAÇA MVNO ===
  {
    id: "nc-1",
    type: "red",
    title: "NuCel Lançamento Oficial - MVNO Brasil",
    description: "Nubank lança NuCel oficialmente em Nov/2024: MVNO na rede Claro, chip físico disponível, planos de R$ 25/mês com cashback para 104M clientes. Ativação via eSIM ou correios.",
    region: "Brasil",
    urgency: 95,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "nc-2",
    type: "red",
    title: "NuCel Integração Ecossistema Financeiro",
    description: "NuCel oferece cashback em recarga, Pix grátis ilimitado e benefícios no Nubank Shopping. Primeira operadora integrada a super app financeiro no Brasil.",
    region: "São Paulo",
    urgency: 92,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "nc-3",
    type: "yellow",
    title: "ISPs Regionais vs. Super Apps", 
    description: "ISPs tradicionais sem portfólio financeiro enfrentam desvantagem competitiva contra NuCel e futuras iniciativas de BigTechs. Gap estratégico de ecossistema digital.",
    region: "São Bernardo do Campo",
    urgency: 88,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "red",
    title: "Starlink - Ofensiva Competitiva Brasil",
    description: "Starlink consolida preço de R$ 184/mês no Brasil com promoções agressivas no equipamento. Penetração de 18% em áreas rurais em 6 meses. Ameaça direta aos ISPs regionais.",
    region: "Brasil",
    urgency: 87,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "nc-4",
    type: "blue", 
    title: "Athon Telecom - Oportunidade MVNO ABC",
    description: "Janela estratégica para Athon desenvolver MVNO: base instalada qualificada ABC, ausência concorrentes locais, potencial 15% receita adicional via combos convergentes.",
    region: "São Bernardo do Campo",
    urgency: 85,
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
  },
  {
    id: "5",
    type: "red",
    title: "Guerra de Preços ABC Paulista",
    description: "Topnet lidera velocidade média em São Bernardo (573Mbps). K2 Network e Fibercom expandem agressivamente com preços 40% abaixo da média regional.",
    region: "São Bernardo do Campo",
    urgency: 84,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "9",
    type: "red",
    title: "Ataque DDoS Coordenado - Infraestrutura ISPs",
    description: "Botnet com 120k dispositivos IoT compromete 35% dos POPs da região Sul. Origem rastreada para servidores na Rússia e Coreia do Norte.",
    region: "Rio Grande do Sul",
    urgency: 92,
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "10",
    type: "red",
    title: "FCC - Revogação Net Neutrality Confirmada",
    description: "FCC confirma revogação das regras de neutralidade da rede. ISPs americanos poderão priorizar tráfego mediante pagamento. Modelo pode ser replicado globalmente.",
    region: "Estados Unidos",
    urgency: 87,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },

  // ALERTAS - Tendências Importantes
  {
    id: "3",
    type: "yellow",
    title: "ANATEL - Nova Regulamentação 5G",
    description: "Resolução 777/2025 da ANATEL revoga regulamentações antigas do 5G. Novos requisitos de compartilhamento de infraestrutura impactam contratos existentes. Compliance até março/2025.",
    region: "Brasil",
    urgency: 82,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "4",
    type: "yellow",  
    title: "5G - Aceleração Massiva no Brasil",
    description: "5G ativo em 589 cidades brasileiras com 45% de cobertura média e 28 milhões de usuários. Crescimento 340% em 12 meses. Pressão sobre ISPs tradicionais aumenta exponencialmente.",
    region: "Brasil",
    urgency: 78,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "6",
    type: "yellow",
    title: "Supply Chain - Normalização Custosa",
    description: "Fornecedores asiáticos reportam normalização gradual na entrega de cabos de fibra óptica, mas custos 15% mais altos que 2023. Lead time reduzido para 8 semanas.",
    region: "Ásia-Pacífico",
    urgency: 72,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "8",
    type: "yellow",
    title: "AI Act Europeu - Compliance Custosa",
    description: "AI Act europeu entra em vigor afetando provedores de serviços de IA. Compliance custará €50-200 milhões para grandes players tecnológicos. Multas de até 7% do faturamento global.",
    region: "Europa",
    urgency: 70,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "11",
    type: "yellow",
    title: "WiFi 7 - Adoção Acelerada Japão",
    description: "Japão lança programa nacional de WiFi 7 com subsídios governamentais. Velocidades de até 46 Gbps ameaçam modelos de ISPs tradicionais. 2.3 milhões de access points planejados até 2026.",
    region: "Japão",
    urgency: 76,
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
  },
  {
    id: "12",
    type: "yellow",
    title: "Consolidação Europeia - Mega Fusões",
    description: "Orange e Deutsche Telekom anunciam intenções de fusão em 6 países europeus. Movimento pode gerar onda de consolidação global no setor telecom.",
    region: "Europa",
    urgency: 74,
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
  },

  // SINAIS FRACOS - Oportunidades Emergentes
  {
    id: "7",
    type: "blue",
    title: "Edge Computing + IA Generativa",
    description: "Convergência entre IA generativa e edge computing criando novos modelos de distribuição de conteúdo. Potencial disruptivo para CDNs tradicionais. Startups captam US$ 2.8bi em funding.",
    region: "América do Norte",
    urgency: 65,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "13",
    type: "blue",
    title: "Computação Quântica Distribuída",
    description: "IBM e Google anunciam protótipos de redes quânticas distribuídas. Potencial para revolucionar segurança e velocidade de comunicações. Testes iniciados em universidades americanas.",
    region: "Estados Unidos",
    urgency: 62,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
  {
    id: "14",
    type: "blue",
    title: "Li-Fi - Comunicação por Luz Visível",
    description: "Startups europeias desenvolvem Li-Fi comercialmente viável com velocidades de até 224 Gbps. Tecnologia pode complementar WiFi em ambientes de alta densidade.",
    region: "Reino Unido",
    urgency: 58,
    timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
  },
  {
    id: "15",
    type: "blue",
    title: "Satélites LEO - Novos Competidores",
    description: "Amazon Kuiper confirma lançamento comercial para Q2/2025. Competição direta com Starlink pode reduzir preços em 60% globalmente. 3.236 satélites planejados.",
    region: "Global",
    urgency: 67,
    timestamp: new Date(Date.now() - 13 * 60 * 60 * 1000),
  },
  {
    id: "16",
    type: "blue",
    title: "6G - Primeiros Padrões Técnicos",
    description: "ITU publica primeiros padrões técnicos para 6G. Velocidades teóricas de 1 Tbps e latência de 0.1ms. Comercialização prevista para 2029-2030.",
    region: "Coreia do Sul",
    urgency: 55,
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
  },
  {
    id: "17",
    type: "blue",
    title: "Blockchain para Mesh Networks",
    description: "Protocolos descentralizados permitem criação de redes mesh autônomas. Usuários compartilham banda e são remunerados em criptomoedas. Testes piloto em favelas do Rio.",
    region: "Rio de Janeiro",
    urgency: 63,
    timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000),
  },

  // REGIONAIS ESPECÍFICOS
  {
    id: "18",
    type: "yellow",
    title: "Metro SP - Fibra Subterrânea Expandida",
    description: "Prefeitura de São Paulo aprova expansão de 2.400km de fibra óptica no metrô. Oportunidade para parcerias público-privadas com ISPs regionais.",
    region: "São Paulo",
    urgency: 71,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "19",
    type: "red",
    title: "Santo André - Licitação Municipal ISP",
    description: "Prefeitura de Santo André abre licitação para ISP municipal. Orçamento de R$ 45 milhões pode alterar dinâmica competitiva na região ABC.",
    region: "Santo André",
    urgency: 83,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "20",
    type: "blue",
    title: "Singapura - Smart Nation 2030",
    description: "Singapura anuncia investimento de US$ 12 bilhões em infraestrutura digital até 2030. Modelo de referência para cidades inteligentes globalmente.",
    region: "Singapura",
    urgency: 64,
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
  },
];

export const SituationRoom = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const scenarioData = useScenarioData();
  
  const {
    isSimulationActive,
    startScenario,
    stopScenario,
    setSimulationSpeed,
    getScenarioAlerts,
    getScenarioMetrics,
    scenarioTemplates,
  } = scenarioData;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Use scenario alerts if simulation is active, otherwise use mock alerts
  const currentAlerts = isSimulationActive ? getScenarioAlerts() : mockAlerts;
  const scenarioMetrics = getScenarioMetrics();

  return (
    <div className={`min-h-screen p-2 sm:p-4 transition-colors duration-500 ${
      isSimulationActive 
        ? 'bg-background bg-gradient-to-br from-background via-background to-warning/5' 
        : 'bg-background'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary" fill="none" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">InnovAIO | Athon Telecom</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary text-primary text-xs sm:text-sm w-fit">
              SITUATION ROOM
            </Badge>
            {isSimulationActive && (
              <Badge className="bg-warning text-warning-foreground pulse-glow text-xs sm:text-sm">
                <Activity className="h-3 w-3 mr-1" />
                SIMULAÇÃO ATIVA
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-center sm:text-right">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {isSimulationActive ? "Simulação" : "Sistema Ativo"}
            </div>
            <div className="text-sm sm:text-lg font-mono text-primary">
              {currentTime.toLocaleTimeString('pt-BR')}
            </div>
          </div>
          {!isSimulationActive ? (
            <ScenarioSelector
              scenarios={scenarioTemplates}
              onStartScenario={startScenario}
              trigger={
                <Button 
                  variant="outline"
                  className="cyber-glow text-xs sm:text-sm w-full sm:w-auto"
                  size="sm"
                >
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">MODO CENÁRIO</span>
                  <span className="sm:hidden">CENÁRIO</span>
                </Button>
              }
            />
          ) : (
            <Button 
              onClick={stopScenario}
              variant="destructive"
              className="text-xs sm:text-sm w-full sm:w-auto"
              size="sm"
            >
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">PARAR CENÁRIO</span>
              <span className="sm:hidden">PARAR</span>
            </Button>
          )}
        </div>
      </div>

      {/* Section 01 - Dashboards Inteligentes */}
      <div className="mb-4 sm:mb-6">
        <Navigation />
      </div>

      {/* Section 02 - Pulsos Globais + Alertas Inteligentes (50%/50%) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        {/* Pulsos Globais */}
        <Card className="min-h-[400px] max-h-[85vh] lg:min-h-[480px] p-3 sm:p-4 lg:p-6 relative isolate">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" />
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold">Pulsos Globais</h2>
            </div>
            <Badge variant="outline" className="text-xs w-fit sm:ml-auto">
              <Activity className="h-3 w-3 mr-1" fill="none" />
              Tempo Real
            </Badge>
          </div>
          <div className="relative h-[calc(100%-60px)] sm:h-[calc(100%-80px)] overflow-hidden">
            <InteractiveGlobeDemo alerts={currentAlerts} />
          </div>
        </Card>

        {/* Alertas Inteligentes */}
        <div className="min-h-[400px] max-h-[85vh] lg:min-h-[480px]">
          <CriticalSignals alerts={currentAlerts} />
        </div>
      </div>

      {/* Section 03 - Status Regional + Mercado Local (50%/50%) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        {/* Status Regional */}
        <div className="relative z-20 min-h-[400px] max-h-[85vh] lg:min-h-[480px]">
          {/* Scenario Controls (only when simulation is active) */}
          {isSimulationActive && (
            <div className="mb-3 sm:mb-4">
              <ScenarioControls
                scenarioMetrics={scenarioMetrics}
                onStop={stopScenario}
                onSpeedChange={setSimulationSpeed}
              />
            </div>
          )}
          
          <div className={isSimulationActive ? "h-[calc(100%-70px)] sm:h-[calc(100%-80px)]" : "h-full"}>
            <GlobalPulseInfo alerts={currentAlerts} />
          </div>
        </div>

        {/* Mercado Local */}
        <div className="min-h-[400px] max-h-[85vh] lg:min-h-[480px]">
          <LocalMarketData />
        </div>
      </div>

      {/* Impact Analysis (only when simulation is active) */}
      {isSimulationActive && (
        <div className="mb-4 sm:mb-6">
          <ImpactAnalysis scenarioMetrics={scenarioMetrics} />
        </div>
      )}

    </div>
  );
};