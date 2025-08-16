import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PanoramaGlobal from "./pages/PanoramaGlobal";
import GuerraCompetitiva from "./pages/GuerraCompetitiva";
import FabricaInovacao from "./pages/FabricaInovacao";
import ObservadorSocial from "./pages/ObservadorSocial";
import CampoOportunidades from "./pages/CampoOportunidades";
import LinhaFogo from "./pages/LinhaFogo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/panorama-global" element={<PanoramaGlobal />} />
          <Route path="/guerra-competitiva" element={<GuerraCompetitiva />} />
          <Route path="/fabrica-inovacao" element={<FabricaInovacao />} />
          <Route path="/observador-social" element={<ObservadorSocial />} />
          <Route path="/campo-oportunidades" element={<CampoOportunidades />} />
          <Route path="/linha-fogo" element={<LinhaFogo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
