import { supabase } from "@/integrations/supabase/client";

export interface LocalMarketData {
  id?: string;
  market_id: string;
  region: string;
  country: string;
  operator: string;
  technology: string;
  market_share: number;
  revenue_millions: number;
  growth_rate: number;
  subscriber_base: number;
  network_coverage: number;
  investment_millions?: number;
  regulatory_status: string;
  competitive_position: string;
  key_partnerships?: string[];
  market_challenges?: string[];
  opportunities?: string[];
}

export interface LocalMarketAlert {
  id: string;
  type: "competitor" | "regulation" | "opportunity" | "threat";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  urgency: number;
  timestamp: Date;
  source: string;
}

class MarketService {
  async getLocalMarketData(): Promise<LocalMarketData[]> {
    const { data, error } = await supabase
      .from('local_market_intel')
      .select('*')
      .order('growth_rate', { ascending: false });

    if (error) {
      console.error('Error fetching local market data:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      key_partnerships: Array.isArray(item.key_partnerships) ? item.key_partnerships.filter(p => typeof p === 'string') : [],
      market_challenges: Array.isArray(item.market_challenges) ? item.market_challenges.filter(c => typeof c === 'string') : [],
      opportunities: Array.isArray(item.opportunities) ? item.opportunities.filter(o => typeof o === 'string') : []
    }));
  }

  async addLocalMarketData(data: Omit<LocalMarketData, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('local_market_intel')
      .insert({
        ...data,
        key_partnerships: data.key_partnerships || [],
        market_challenges: data.market_challenges || [],
        opportunities: data.opportunities || []
      });

    if (error) {
      console.error('Error adding local market data:', error);
      throw error;
    }
  }

  async updateLocalMarketData(id: string, data: Partial<LocalMarketData>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('local_market_intel')
      .update({
        ...data,
        key_partnerships: data.key_partnerships || undefined,
        market_challenges: data.market_challenges || undefined,
        opportunities: data.opportunities || undefined
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating local market data:', error);
      throw new Error(`Failed to update market data: ${error.message}`);
    }
  }

  async deleteLocalMarketData(id: string): Promise<void> {
    const { error } = await supabase
      .from('local_market_intel')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting local market data:', error);
      throw new Error(`Failed to delete market data: ${error.message}`);
    }
  }

  async getMarketDataByRegion(region: string): Promise<LocalMarketData[]> {
    const { data, error } = await supabase
      .from('local_market_intel')
      .select('*')
      .eq('region', region)
      .order('growth_rate', { ascending: false });

    if (error) {
      console.error('Error fetching market data by region:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      key_partnerships: Array.isArray(item.key_partnerships) ? item.key_partnerships.filter(p => typeof p === 'string') : [],
      market_challenges: Array.isArray(item.market_challenges) ? item.market_challenges.filter(c => typeof c === 'string') : [],
      opportunities: Array.isArray(item.opportunities) ? item.opportunities.filter(o => typeof o === 'string') : []
    }));
  }

  // Mock alerts for compatibility with existing component
  generateMockAlerts(): LocalMarketAlert[] {
    return [
      {
        id: "1",
        type: "competitor",
        title: "Topnet Domina São Bernardo do Campo",
        description: "Topnet lidera ranking com 573Mbps médios em São Bernardo do Campo, estabelecendo novo padrão de qualidade na região da Athon Telecom.",
        impact: "high",
        urgency: 85,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        source: "MinhaConexao.com.br"
      },
      {
        id: "2",
        type: "competitor",
        title: "K2 Network - Expansão no Grajaú",
        description: "K2 Network intensifica marketing no Grajaú como 'Internet 100% Fibra mais rápida', ameaçando posição da Athon na região sul.",
        impact: "high",
        urgency: 80,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        source: "Análise Competitiva"
      },
      {
        id: "3",
        type: "competitor",
        title: "Fibercom - Preços Agressivos Franco da Rocha",
        description: "Fibercom oferece planos a partir de R$ 120/mês em Franco da Rocha, pressionando margens na região norte da Grande SP.",
        impact: "medium",
        urgency: 75,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        source: "Monitoramento de Preços"
      },
      {
        id: "4",
        type: "threat",
        title: "Claro Fibra - Entrada Disruptiva ABC",
        description: "Claro acelera expansão da fibra óptica em São Bernardo do Campo com planos a partir de R$ 49,90, potencial guerra de preços iminente.",
        impact: "high",
        urgency: 90,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        source: "Intel. Mercado"
      },
      {
        id: "5",
        type: "opportunity",
        title: "Demanda Corporativa - SBC Industrial",
        description: "Empresas do polo industrial de São Bernardo aumentam demanda por soluções dedicadas. Mercedes-Benz e Scania modernizando infraestrutura.",
        impact: "high",
        urgency: 70,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        source: "Análise Setorial"
      },
      {
        id: "6",
        type: "regulation",
        title: "Prefeitura SBC - Facilitação para Fibra",
        description: "Prefeitura de São Bernardo do Campo simplifica processos para instalação de fibra óptica, reduzindo tempo de licenciamento em 40%.",
        impact: "medium",
        urgency: 60,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        source: "Diário Oficial SBC"
      },
      {
        id: "7",
        type: "opportunity",
        title: "Expansão Residencial - Grajaú",
        description: "Crescimento habitacional no Grajaú com novos condomínios residenciais. Oportunidade para parcerias estratégicas com construtoras.",
        impact: "medium",
        urgency: 65,
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        source: "Setor Imobiliário"
      },
      {
        id: "8",
        type: "threat",
        title: "Net Virtua - Pressão Franco da Rocha",
        description: "Net Virtua intensifica marketing em Franco da Rocha com promoções agressivas, mirando base de clientes residenciais da Athon.",
        impact: "medium",
        urgency: 72,
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        source: "Monitoramento Competitivo"
      },
      {
        id: "9",
        type: "opportunity",
        title: "5G Corporate - Todas as Regiões",
        description: "Demanda crescente por soluções 5G corporativas em São Bernardo, Grajaú e Franco da Rocha. Athon bem posicionada com infraestrutura existente.",
        impact: "high",
        urgency: 68,
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
        source: "Análise de Mercado"
      },
      {
        id: "10",
        type: "regulation",
        title: "ANATEL - Expansão Rural Franco da Rocha",
        description: "Edital ANATEL para expansão de banda larga rural favorece Franco da Rocha. Athon pode participar de programas de incentivo governamental.",
        impact: "medium",
        urgency: 58,
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        source: "ANATEL"
      }
    ];
  }
}

export const marketService = new MarketService();