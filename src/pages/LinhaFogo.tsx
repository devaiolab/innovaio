import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crosshair, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LinhaFogo = () => {
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
          <Crosshair className="h-8 w-8 text-primary cyber-glow" />
          <h1 className="text-3xl font-bold gradient-text">Linha de Fogo</h1>
        </div>
        <Badge variant="destructive" className="alert-pulse">
          2 AMEAÇAS CRÍTICAS
        </Badge>
      </div>

      <div className="text-center py-20">
        <Crosshair className="h-16 w-16 text-destructive mx-auto mb-4 pulse-glow" />
        <h2 className="text-2xl font-semibold mb-4">Ameaças Imediatas</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Monitoramento de riscos disruptivos e ameaças que requerem resposta imediata.
        </p>
      </div>
    </div>
  );
};

export default LinhaFogo;