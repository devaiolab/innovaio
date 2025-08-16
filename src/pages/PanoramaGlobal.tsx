import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, ArrowLeft, TrendingUp, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PanoramaGlobal = () => {
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
          <Globe className="h-8 w-8 text-primary cyber-glow" />
          <h1 className="text-3xl font-bold gradient-text">Panorama Global</h1>
        </div>
        <Badge variant="outline" className="border-primary text-primary">
          TENDÊNCIAS MUNDIAIS
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-success" />
            <h2 className="text-xl font-semibold">Tendências Emergentes</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
              <h3 className="font-semibold mb-2">Computação Quântica</h3>
              <p className="text-sm text-muted-foreground">
                Avanços significativos em correção de erros quânticos estão acelerando a viabilidade comercial.
              </p>
            </div>
            <div className="p-4 border border-warning/20 rounded-lg bg-warning/5">
              <h3 className="font-semibold mb-2">IA Generativa Multimodal</h3>
              <p className="text-sm text-muted-foreground">
                Convergência de texto, imagem, áudio e vídeo em modelos únicos revoluciona aplicações.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-semibold">Alertas Críticos</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Dashboard em desenvolvimento...
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PanoramaGlobal;