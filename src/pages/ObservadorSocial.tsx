import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ArrowLeft, TrendingUp, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SocialTrendsAnalysis } from "@/components/observador-social/SocialTrendsAnalysis";
import { InfluencerNetwork } from "@/components/observador-social/InfluencerNetwork";

const ObservadorSocial = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="cyber-glow"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" fill="none" />
          <h1 className="text-3xl font-bold gradient-text">Observador Social</h1>
        </div>
        <Badge variant="outline" className="border-success text-success">
          ATIVO - 4 TENDÊNCIAS
        </Badge>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Análise de Tendências
          </TabsTrigger>
          <TabsTrigger value="influencers" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Rede de Influenciadores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <SocialTrendsAnalysis />
        </TabsContent>

        <TabsContent value="influencers">
          <InfluencerNetwork />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ObservadorSocial;