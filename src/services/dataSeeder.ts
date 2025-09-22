import { competitiveService } from './competitiveService';
import { socialService } from './socialService';
import { innovationService } from './innovationService';
import { threatService } from './threatService';

class DataSeeder {
  async seedAllData(): Promise<void> {
    console.log('Starting data seeding...');
    
    try {
      await Promise.all([
        this.seedCompetitiveData(),
        this.seedSocialData(),
        this.seedInnovationData(),
        this.seedThreatData()
      ]);
      
      console.log('Data seeding completed successfully!');
    } catch (error) {
      console.error('Error during data seeding:', error);
      throw error;
    }
  }

  private async seedCompetitiveData(): Promise<void> {
    const competitors = [
      {
        competitor_id: "comp_001",
        name: "TechCorp",
        market_share: 15.2,
        innovation_score: 8.5,
        funding_millions: 250,
        patent_score: 7.8,
        threat_level: "alto",
        sector: "Tecnologia",
        recent_moves: ["Aquisição de startup de IA", "Lançamento de produto 5G"]
      },
      {
        competitor_id: "comp_002", 
        name: "InnovaTel",
        market_share: 12.8,
        innovation_score: 9.1,
        funding_millions: 180,
        patent_score: 8.9,
        threat_level: "alto",
        sector: "Telecomunicações",
        recent_moves: ["Parceria com Google Cloud", "Expansão para mercado europeu"]
      }
    ];

    const events = [
      {
        event_id: "evt_001",
        event_date: "2024-01-15",
        company: "TechCorp",
        event_type: "Aquisição",
        title: "Aquisição da StartupAI",
        description: "TechCorp adquire startup de inteligência artificial por $50M",
        impact_score: 8.5,
        financial_value: 50,
        sector: "Tecnologia"
      }
    ];

    for (const competitor of competitors) {
      await competitiveService.addCompetitor(competitor);
    }

    for (const event of events) {
      await competitiveService.addStrategicEvent(event);
    }
  }

  private async seedSocialData(): Promise<void> {
    const influencers = [
      {
        influencer_id: "inf_001",
        name: "Tech Leader BR",
        platform: "LinkedIn",
        followers: 150000,
        engagement_rate: 8.5,
        influence_score: 9.2,
        topics: ["5G", "IoT", "Transformação Digital"],
        recent_post: "O futuro das telecomunicações está na convergência de tecnologias",
        business_impact: "alto",
        tier: "macro"
      }
    ];

    const trends = [
      {
        trend_id: "trend_001",
        topic: "5G no Brasil",
        platform: "Twitter",
        sentiment: "positivo" as const,
        engagement: 45000,
        mentions: 12000,
        growth_rate: 15.3,
        impact_level: "alto" as const,
        region: "Nacional",
        keywords: ["5G", "conectividade", "inovação"],
        business_relevance: 9.1
      }
    ];

    for (const influencer of influencers) {
      await socialService.addInfluencer(influencer);
    }

    for (const trend of trends) {
      await socialService.addSocialTrend(trend);
    }
  }

  private async seedInnovationData(): Promise<void> {
    const opportunities = [
      {
        opportunity_id: "opp_001",
        title: "Edge Computing para IoT",
        category: "Infraestrutura",
        maturity_level: "Médio",
        roi_percentage: 320,
        time_to_market_months: 18,
        investment_millions: 5.2,
        potential_level: "alto",
        technologies: ["Edge Computing", "IoT", "5G"],
        applications: ["Smart Cities", "Indústria 4.0", "Telemedicina"]
      }
    ];

    const techEvolution = [
      {
        tech_id: "5g",
        category: "5G/6G",
        month_year: "2024-01",
        progress_value: 75,
        growth_rate: 12.5,
        icon: "antenna",
        color_code: "#8b5cf6"
      }
    ];

    const sectors = [
      {
        sector_id: "sec_001",
        sector_name: "Telecomunicações",
        investment_millions: 2500,
        patents_count: 1250,
        startups_count: 89,
        risk_level: "médio",
        opportunity_score: 8.7
      }
    ];

    for (const opp of opportunities) {
      await innovationService.addOpportunity(opp);
    }

    for (const tech of techEvolution) {
      await innovationService.addTechEvolution(tech);
    }

    for (const sector of sectors) {
      await innovationService.addSectorData(sector);
    }
  }

  private async seedThreatData(): Promise<void> {
    const threats = [
      {
        threat_id: "threat_001",
        threat_type: "Competitivo",
        region: "Sudeste",
        severity_level: "alto",
        likelihood: 0.75,
        impact_area: "Market Share",
        mitigation_status: "Em Andamento"
      }
    ];

    const plans = [
      {
        plan_id: "plan_001",
        scenario: "Entrada de Big Tech",
        threat_type: "Competitivo",
        response_actions: ["Acelerar inovação", "Parcerias estratégicas", "Aquisições"],
        estimated_time: "6 meses",
        resource_requirements: "R$ 50M + equipe dedicada",
        success_probability: 0.8
      }
    ];

    const regionalTrends = [
      {
        trend_id: "reg_001",
        region: "São Paulo",
        technology: "5G",
        impact_level: "alto",
        growth_percentage: 25.5,
        intensity: 8.7,
        coordinates: { lat: -23.5505, lng: -46.6333 },
        market_data: { population: 12000000, gdp: 400000 }
      }
    ];

    for (const threat of threats) {
      await threatService.addMarketThreat(threat);
    }

    for (const plan of plans) {
      await threatService.addContingencyPlan(plan);
    }

    for (const trend of regionalTrends) {
      await threatService.addRegionalTrend(trend);
    }
  }
}

export const dataSeeder = new DataSeeder();