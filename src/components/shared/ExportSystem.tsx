import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Download, 
  FileText, 
  Table, 
  Image, 
  Mail,
  Calendar,
  Settings,
  Check
} from "lucide-react";

interface ExportOption {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  formats: string[];
  modules: string[];
  featured?: boolean;
}

const exportOptions: ExportOption[] = [
  {
    id: "executive-summary",
    label: "Relatório Executivo",
    description: "Resumo estratégico com insights principais e recomendações",
    icon: FileText,
    formats: ["PDF", "DOCX"],
    modules: ["all"],
    featured: true
  },
  {
    id: "competitive-analysis",
    label: "Análise Competitiva",
    description: "Mapeamento detalhado da concorrência e posicionamento",
    icon: Table,
    formats: ["PDF", "XLSX", "PPTX"],
    modules: ["Guerra Competitiva", "Panorama Global"]
  },
  {
    id: "opportunity-dashboard",
    label: "Dashboard de Oportunidades", 
    description: "Matriz de oportunidades com métricas e priorização",
    icon: Image,
    formats: ["PDF", "PNG", "XLSX"],
    modules: ["Campo Oportunidades"]
  },
  {
    id: "risk-assessment",
    label: "Avaliação de Riscos",
    description: "Análise de ameaças e planos de contingência",
    icon: FileText,
    formats: ["PDF", "DOCX"],
    modules: ["Linha de Fogo"]
  },
  {
    id: "innovation-pipeline",
    label: "Pipeline de Inovação",
    description: "Radar tecnológico e projetos de P&D",
    icon: Table,
    formats: ["XLSX", "PDF"],
    modules: ["Fábrica Inovação"]
  },
  {
    id: "social-insights",
    label: "Insights Sociais",
    description: "Tendências sociais e análise de influenciadores",
    icon: Image,
    formats: ["PDF", "PPTX"],
    modules: ["Observador Social"]
  }
];

const formatOptions = [
  { value: "PDF", label: "PDF", description: "Documento portátil" },
  { value: "DOCX", label: "Word", description: "Documento editável" },
  { value: "XLSX", label: "Excel", description: "Planilha de dados" },
  { value: "PPTX", label: "PowerPoint", description: "Apresentação" },
  { value: "PNG", label: "Imagem", description: "Imagem PNG" }
];

export const ExportSystem = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [customOptions, setCustomOptions] = useState({
    includeTrends: true,
    includeMetrics: true,
    includeCharts: true,
    includeRecommendations: true,
    executiveSummary: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, this would generate and download the file
    const filename = `innovaio-report-${new Date().toISOString().split('T')[0]}.${selectedFormat.toLowerCase()}`;
    
    // Create a mock download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Mock export file content';
    link.download = filename;
    link.click();
    
    setIsExporting(false);
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleCustomOptionToggle = (option: keyof typeof customOptions) => {
    setCustomOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cyber-glow">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatórios
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Sistema de Exportação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Options */}
          <div>
            <h3 className="font-semibold mb-4">Selecione os Relatórios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedOptions.includes(option.id);
                
                return (
                  <Card 
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                    } ${option.featured ? 'border-primary/50' : ''}`}
                    onClick={() => handleOptionToggle(option.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center">
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => handleOptionToggle(option.id)}
                        />
                      </div>
                      
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{option.label}</h4>
                          {option.featured && (
                            <Badge variant="secondary" className="text-xs">
                              Recomendado
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {option.description}
                        </p>
                        
                        <div className="flex gap-1">
                          {option.formats.map(format => (
                            <Badge key={format} variant="outline" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <h3 className="font-semibold mb-4">Formato de Saída</h3>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map(format => (
                  <SelectItem key={format.value} value={format.value}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{format.label}</span>
                      <span className="text-sm text-muted-foreground">
                        - {format.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Options */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Opções de Personalização
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(customOptions).map(([key, value]) => {
                const labels = {
                  includeTrends: "Incluir análise de tendências",
                  includeMetrics: "Incluir métricas e KPIs",
                  includeCharts: "Incluir gráficos e visualizações",
                  includeRecommendations: "Incluir recomendações estratégicas",
                  executiveSummary: "Incluir resumo executivo"
                };
                
                return (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleCustomOptionToggle(key as keyof typeof customOptions)}
                    />
                    <label
                      htmlFor={key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {labels[key as keyof typeof labels]}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Summary */}
          {selectedOptions.length > 0 && (
            <Card className="p-4 bg-muted/50">
              <h4 className="font-semibold mb-2">Resumo da Exportação</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Relatórios selecionados:</span>
                  <span className="font-medium">{selectedOptions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Formato:</span>
                  <span className="font-medium">{selectedFormat}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tamanho estimado:</span>
                  <span className="font-medium">
                    {selectedOptions.length * 2.5}MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo estimado:</span>
                  <span className="font-medium">
                    {Math.ceil(selectedOptions.length * 1.5)}min
                  </span>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handleExport}
              disabled={selectedOptions.length === 0 || isExporting}
              className="flex-1 cyber-glow"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Agora
                </>
              )}
            </Button>
            
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Exportação
            </Button>
            
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Enviar por Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};