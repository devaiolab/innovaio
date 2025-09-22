import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import PanoramaGlobal from "./pages/PanoramaGlobal";
import GuerraCompetitiva from "./pages/GuerraCompetitiva";
import FabricaInovacao from "./pages/FabricaInovacao";
import ObservadorSocial from "./pages/ObservadorSocial";
import CampoOportunidades from "./pages/CampoOportunidades";
import LinhaFogo from "./pages/LinhaFogo";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/panorama-global" element={
              <ProtectedRoute>
                <PanoramaGlobal />
              </ProtectedRoute>
            } />
            <Route path="/guerra-competitiva" element={
              <ProtectedRoute>
                <GuerraCompetitiva />
              </ProtectedRoute>
            } />
            <Route path="/fabrica-inovacao" element={
              <ProtectedRoute>
                <FabricaInovacao />
              </ProtectedRoute>
            } />
            <Route path="/observador-social" element={
              <ProtectedRoute>
                <ObservadorSocial />
              </ProtectedRoute>
            } />
            <Route path="/campo-oportunidades" element={
              <ProtectedRoute>
                <CampoOportunidades />
              </ProtectedRoute>
            } />
            <Route path="/linha-fogo" element={
              <ProtectedRoute>
                <LinhaFogo />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
