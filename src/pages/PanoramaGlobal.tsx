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
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="cyber-glow w-fit"
          size="sm"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">Voltar</span>
        </Button>
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-primary cyber-glow" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">Panorama Global</h1>
        </div>
        <Badge variant="outline" className="border-primary text-primary text-xs sm:text-sm w-fit sm:ml-auto">
          TENDÊNCIAS ATIVAS
        </Badge>
      </div>

      <div className="space-y-4 sm:space-y-8">
        <TrendingMap />
        <TechEvolution />
        <SectorTrends />
      </div>
    </div>
  );
};

export default PanoramaGlobal;