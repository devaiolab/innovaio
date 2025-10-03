import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Crown, Users, MessageSquare, Zap, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { socialService } from "@/services/socialService";

interface Influencer {
  id: string;
  name: string;
  platform: string;
  followers: number;
  engagement: number;
  influence: number;
  topics: string[];
  recentPost: string;
  businessImpact: "alto" | "médio" | "baixo";
  tier: "mega" | "macro" | "micro" | "nano";
}

const influencers: Influencer[] = [
  {
    id: "inf-1",
    name: "Dr. Tech Brasil",
    platform: "LinkedIn",
    followers: 850000,
    engagement: 12.5,
    influence: 94,
    topics: ["5G", "IoT", "Tecnologia"],
    recentPost: "O futuro das redes privadas 5G na indústria brasileira",
    businessImpact: "alto",
    tier: "mega"
  },
  {
    id: "inf-2", 
    name: "TelecomWatch",
    platform: "Twitter",
    followers: 245000,
    engagement: 8.3,
    influence: 87,
    topics: ["Telecom", "Regulação", "Mercado"],
    recentPost: "MVNOs ganham espaço: oportunidade ou ameaça?",
    businessImpact: "alto",
    tier: "macro"
  },
  {
    id: "inf-3",
    name: "Innovation Hub",
    platform: "Instagram",
    followers: 89000,
    engagement: 15.2,
    influence: 76,
    topics: ["Startups", "Inovação", "Tech"],
    recentPost: "Cases de sucesso em connectivity solutions",
    businessImpact: "médio",
    tier: "micro"
  },
  {
    id: "inf-4",
    name: "RegTech Insights",
    platform: "YouTube",
    followers: 156000,
    engagement: 6.8,
    influence: 82,
    topics: ["Regulação", "Compliance", "Anatel"],
    recentPost: "Mudanças regulatórias 2024: impacto no setor",
    businessImpact: "alto",
    tier: "macro"
  },
  {
    id: "inf-5",
    name: "StartupTelco",
    platform: "TikTok",
    followers: 34000,
    engagement: 22.1,
    influence: 68,
    topics: ["Empreendedorismo", "Telecom", "Jovens"],
    recentPost: "Como os jovens veem o futuro da conectividade",
    businessImpact: "médio",
    tier: "micro"
  }
];

const getTierConfig = (tier: Influencer["tier"]) => {
  switch (tier) {
    case "mega":
      return { icon: Crown, color: "text-yellow-500", label: "Mega", bg: "bg-yellow-500/10" };
    case "macro":
      return { icon: Users, color: "text-blue-500", label: "Macro", bg: "bg-blue-500/10" };
    case "micro":
      return { icon: MessageSquare, color: "text-green-500", label: "Micro", bg: "bg-green-500/10" };
    case "nano":
      return { icon: Zap, color: "text-purple-500", label: "Nano", bg: "bg-purple-500/10" };
  }
};

const getImpactColor = (impact: Influencer["businessImpact"]) => {
  switch (impact) {
    case "alto":
      return "bg-destructive text-destructive-foreground";
    case "médio":
      return "bg-warning text-warning-foreground";
    case "baixo":
      return "bg-success text-success-foreground";
  }
};

const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
};

export const InfluencerNetwork = () => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null);
  const [influencerList, setInfluencerList] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        const data = await socialService.getInfluencers();
        const mapped: Influencer[] = data.map(inf => ({
          id: inf.influencer_id,
          name: inf.name,
          platform: inf.platform,
          followers: inf.followers,
          engagement: inf.engagement_rate,
          influence: inf.influence_score,
          topics: inf.topics || [],
          recentPost: inf.recent_post || "",
          businessImpact: inf.business_impact as any,
          tier: inf.tier as any
        }));
        setInfluencerList(mapped.length > 0 ? mapped : influencers);
      } catch (error) {
        console.error('Error loading influencers:', error);
        setInfluencerList(influencers);
      } finally {
        setLoading(false);
      }
    };

    loadInfluencers();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const totalReach = influencerList.reduce((acc, inf) => acc + inf.followers, 0);
  const avgEngagement = influencerList.length > 0 ? influencerList.reduce((acc, inf) => acc + inf.engagement, 0) / influencerList.length : 0;

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-semibold">Alcance Total</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {formatFollowers(totalReach)}
          </div>
          <div className="text-sm text-muted-foreground">
            Seguidores combinados
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="font-semibold">Engajamento Médio</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {avgEngagement.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">
            Taxa de interação
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-5 w-5 text-primary" />
            <span className="font-semibold">Influenciadores</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {influencerList.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Monitorados ativamente
          </div>
        </Card>
      </div>

      {/* Influencer Cards */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Rede de Influenciadores</h3>
          <Button variant="outline" size="sm" className="cyber-glow">
            Adicionar Influenciador
          </Button>
        </div>

        <div className="space-y-4">
          {influencerList.map((influencer) => {
            const TierIcon = getTierConfig(influencer.tier).icon;
            
            return (
              <Card key={influencer.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {influencer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{influencer.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{influencer.platform}</span>
                          <span>•</span>
                          <span>{formatFollowers(influencer.followers)} seguidores</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className={`p-2 rounded-lg ${getTierConfig(influencer.tier).bg}`}>
                          <TierIcon className={`h-4 w-4 ${getTierConfig(influencer.tier).color}`} />
                        </div>
                        <Badge className={getImpactColor(influencer.businessImpact)}>
                          Impacto {influencer.businessImpact}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Engajamento</span>
                          <span className="text-sm text-muted-foreground">{influencer.engagement}%</span>
                        </div>
                        <Progress value={influencer.engagement * 5} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Influência</span>
                          <span className="text-sm text-muted-foreground">{influencer.influence}%</span>
                        </div>
                        <Progress value={influencer.influence} className="h-2" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-2">Último post:</p>
                      <p className="text-sm italic">"{influencer.recentPost}"</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {influencer.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" size="sm" className="gap-2">
                        Ver Perfil
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};