import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TrendingMap } from "@/components/panorama/TrendingMap";
import { TechEvolution } from "@/components/panorama/TechEvolution";
import { SectorTrends } from "@/components/panorama/SectorTrends";

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
          TENDÊNCIAS MUNDIAIS ATIVAS
        </Badge>
      </div>

      <div className="space-y-8">
        <TrendingMap />
        <TechEvolution />
        <SectorTrends />
      </div>
    </div>
  );
};

export default PanoramaGlobal;