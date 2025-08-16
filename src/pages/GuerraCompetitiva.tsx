import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Swords, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuerraCompetitiva = () => {
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
          <Swords className="h-8 w-8 text-primary cyber-glow" />
          <h1 className="text-3xl font-bold gradient-text">Guerra Competitiva</h1>
        </div>
        <Badge variant="outline" className="border-warning text-warning">
          ATUALIZANDO
        </Badge>
      </div>

      <div className="text-center py-20">
        <Swords className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Dashboard em Desenvolvimento</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Este módulo de análise competitiva está sendo preparado com inteligência estratégica avançada.
        </p>
      </div>
    </div>
  );
};

export default GuerraCompetitiva;