import { SituationRoom } from "@/components/SituationRoom";
import { GlobalSearchSystem } from "@/components/shared/GlobalSearchSystem";
import { ExportSystem } from "@/components/shared/ExportSystem";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <GlobalSearchSystem />
          </div>
          <ExportSystem />
        </div>
        
        <SituationRoom />
      </div>
    </div>
  );
};

export default Index;
