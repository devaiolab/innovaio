import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Swords, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CompetitiveMatrix } from "@/components/competitive/CompetitiveMatrix";
import { StrategicTimeline } from "@/components/competitive/StrategicTimeline";

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
        <Badge variant="destructive" className="alert-pulse">
          6 AMEAÇAS ATIVAS
        </Badge>
      </div>

      <div className="space-y-8">
        <CompetitiveMatrix />
        <StrategicTimeline />
      </div>
    </div>
  );
};

export default GuerraCompetitiva;