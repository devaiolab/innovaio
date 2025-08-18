import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Swords, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CompetitiveMatrix } from "@/components/competitive/CompetitiveMatrix";
import { StrategicTimeline } from "@/components/competitive/StrategicTimeline";

const GuerraCompetitiva = () => {
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
          <Swords className="h-6 w-6 sm:h-8 sm:w-8 text-primary" fill="none" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">Guerra Competitiva</h1>
        </div>
        <Badge variant="destructive" className="alert-pulse text-xs sm:text-sm w-fit sm:ml-auto">
          6 AMEAÇAS ATIVAS
        </Badge>
      </div>

      <div className="space-y-4 sm:space-y-8">
        <CompetitiveMatrix />
        <StrategicTimeline />
      </div>
    </div>
  );
};

export default GuerraCompetitiva;