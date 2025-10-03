import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Heart, MessageCircle, Share, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { socialService } from "@/services/socialService";

interface SocialTrend {
  id: string;
  topic: string;
  platform: string;
  sentiment: "positive" | "negative" | "neutral";
  engagement: number;
  mentions: number;
  growth: number;
  impact: "alto" | "médio" | "baixo";
  region: string;
  keywords: string[];
  businessRelevance: number;
}

const socialTrends: SocialTrend[] = [
  {
    id: "trend-1",
    topic: "5G Private Networks",
    platform: "LinkedIn",
    sentiment: "positive",
    engagement: 85,
    mentions: 2847,
    growth: 127,
    impact: "alto",
    region: "Brasil",
    keywords: ["rede privada", "5G", "indústria 4.0", "IoT"],
    businessRelevance: 92
  },
  {
    id: "trend-2", 
    topic: "Telecom Sustainability",
    platform: "Twitter",
    sentiment: "positive",
    engagement: 72,
    mentions: 1523,
    growth: 89,
    impact: "médio",
    region: "São Paulo",
    keywords: ["sustentabilidade", "energia renovável", "ESG"],
    businessRelevance: 78
  },
  {
    id: "trend-3",
    topic: "MVNO Complaints",
    platform: "Facebook",
    sentiment: "negative",
    engagement: 64,
    mentions: 892,
    growth: -23,
    impact: "alto",
    region: "Rio de Janeiro",
    keywords: ["reclamação", "MVNO", "qualidade", "atendimento"],
    businessRelevance: 95
  },
  {
    id: "trend-4",
    topic: "Edge Computing Adoption",
    platform: "Instagram",
    sentiment: "neutral",
    engagement: 45,
    mentions: 567,
    growth: 56,
    impact: "médio",
    region: "Brasil",
    keywords: ["edge computing", "latência", "games", "streaming"],
    businessRelevance: 73
  }
];

const platformIcons = {
  LinkedIn: "💼",
  Twitter: "🐦", 
  Facebook: "📘",
  Instagram: "📷"
};

export const SocialTrendsAnalysis = () => {
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  const [trends, setTrends] = useState<SocialTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const data = await socialService.getSocialTrends();
        const mapped: SocialTrend[] = data.map(t => ({
          id: t.trend_id,
          topic: t.topic,
          platform: t.platform,
          sentiment: t.sentiment as any,
          engagement: t.engagement,
          mentions: t.mentions,
          growth: t.growth_rate,
          impact: t.impact_level as any,
          region: t.region,
          keywords: t.keywords || [],
          businessRelevance: t.business_relevance
        }));
        setTrends(mapped.length > 0 ? mapped : socialTrends);
      } catch (error) {
        console.error('Error loading trends:', error);
        setTrends(socialTrends);
      } finally {
        setLoading(false);
      }
    };

    loadTrends();
  }, []);

  const getSentimentColor = (sentiment: SocialTrend["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "text-success border-success";
      case "negative":
        return "text-destructive border-destructive";
      case "neutral":
        return "text-warning border-warning";
    }
  };

  const getImpactColor = (impact: SocialTrend["impact"]) => {
    switch (impact) {
      case "alto":
        return "bg-destructive";
      case "médio":
        return "bg-warning";
      case "baixo":
        return "bg-success";
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const totalMentions = trends.reduce((sum, trend) => sum + trend.mentions, 0);
  const avgEngagement = trends.length > 0 ? Math.round(
    trends.reduce((sum, trend) => sum + trend.engagement, 0) / trends.length
  ) : 0;
  const avgRelevance = trends.length > 0 ? Math.round(
    trends.reduce((sum, trend) => sum + trend.businessRelevance, 0) / trends.length
  ) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="font-semibold">Menções Totais</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {totalMentions.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            +12% vs. semana anterior
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-semibold">Engajamento Médio</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {avgEngagement}%
          </div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            +5% vs. semana anterior
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Share className="h-5 w-5 text-primary" />
            <span className="font-semibold">Relevância Business</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {avgRelevance}%
          </div>
          <div className="flex items-center gap-1 text-sm text-warning">
            <TrendingDown className="h-4 w-4" />
            -2% vs. semana anterior
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-5 w-5 text-primary" />
            <span className="font-semibold">Tendências Ativas</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {trends.length}
          </div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            2 novas esta semana
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Análise de Tendências Sociais</h3>
          <Button variant="outline" size="sm" className="cyber-glow">
            Exportar Relatório
          </Button>
        </div>

        <div className="space-y-4">
          {trends.map((trend) => (
            <Card key={trend.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platformIcons[trend.platform as keyof typeof platformIcons]}</span>
                  <div>
                    <h4 className="font-semibold">{trend.topic}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{trend.platform}</span>
                      <span>•</span>
                      <span>{trend.region}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant="outline" 
                    className={getSentimentColor(trend.sentiment)}
                  >
                    {trend.sentiment}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getImpactColor(trend.impact)} text-white border-transparent`}
                  >
                    Impacto {trend.impact}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Engajamento</span>
                    <span className="text-sm text-muted-foreground">{trend.engagement}%</span>
                  </div>
                  <Progress value={trend.engagement} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Relevância Business</span>
                    <span className="text-sm text-muted-foreground">{trend.businessRelevance}%</span>
                  </div>
                  <Progress value={trend.businessRelevance} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Crescimento</span>
                    <span className={`text-sm ${trend.growth > 0 ? 'text-success' : 'text-destructive'}`}>
                      {trend.growth > 0 ? '+' : ''}{trend.growth}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.abs(trend.growth)} 
                    className={`h-2 ${trend.growth < 0 ? '[&>div]:bg-destructive' : ''}`} 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {trend.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{keyword}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {trend.mentions.toLocaleString()} menções
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};