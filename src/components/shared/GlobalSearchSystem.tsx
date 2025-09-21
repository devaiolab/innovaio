import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Users,
  Globe,
  Crosshair,
  Lightbulb,
  Swords,
  X
} from "lucide-react";
import { dataService } from "@/services/dataService";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "alert" | "opportunity" | "trend" | "influencer" | "threat" | "innovation";
  module: string;
  relevance: number;
  timestamp: Date;
  tags: string[];
  metadata?: Record<string, any>;
}

// Real search results will be fetched through dataService

const typeIcons = {
  alert: AlertTriangle,
  opportunity: Target,
  trend: TrendingUp,
  influencer: Users,
  threat: Crosshair,
  innovation: Lightbulb
};

const moduleIcons = {
  "Panorama Global": Globe,
  "Guerra Competitiva": Swords,
  "Fábrica Inovação": Lightbulb,
  "Observador Social": Users,
  "Campo Oportunidades": Target,
  "Linha de Fogo": Crosshair
};

const typeColors = {
  alert: "bg-destructive/10 text-destructive border-destructive/20",
  opportunity: "bg-success/10 text-success border-success/20",
  trend: "bg-primary/10 text-primary border-primary/20",
  influencer: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  threat: "bg-warning/10 text-warning border-warning/20",
  innovation: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
};

export const GlobalSearchSystem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "NuCel MVNO",
    "5G Private Networks", 
    "Regulatory Changes",
    "Athon Telecom Strategy"
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const performSearch = async () => {
        setLoading(true);
        try {
          const searchResults = await dataService.performGlobalSearch(searchQuery, selectedFilters);
          setResults(searchResults);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      
      const debounceTimer = setTimeout(performSearch, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchQuery, selectedFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!recentSearches.includes(query) && query.length > 2) {
      setRecentSearches(prev => [query, ...prev.slice(0, 3)]);
    }
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m atrás`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h atrás`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d atrás`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-muted-foreground">
          <Search className="h-4 w-4 mr-2" />
          Buscar em todos os módulos...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Busca Global INNOVAIO
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Buscar alertas, oportunidades, tendências..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {Object.keys(typeIcons).map(type => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              const isSelected = selectedFilters.includes(type);
              
              return (
                <Button
                  key={type}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(type)}
                  className="h-7"
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {type}
                </Button>
              );
            })}
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilters([])}
                className="h-7"
              >
                <X className="h-3 w-3 mr-1" />
                Limpar
              </Button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-sm text-muted-foreground">Buscando dados reais...</p>
              </div>
            ) : searchQuery.length <= 2 ? (
              <div className="space-y-4">
                {/* Recent Searches */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Buscas Recentes
                  </h4>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start h-8"
                        onClick={() => handleSearch(search)}
                      >
                        <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quick Access */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Acesso Rápido</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(moduleIcons).map(([module, Icon]) => (
                      <Button key={module} variant="outline" className="justify-start h-8">
                        <Icon className="h-3 w-3 mr-2" />
                        {module}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              results.map((result) => {
                const TypeIcon = typeIcons[result.type];
                const ModuleIcon = moduleIcons[result.module as keyof typeof moduleIcons];
                
                return (
                  <Card key={result.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${typeColors[result.type]}`}>
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{result.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {result.relevance}% match
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <ModuleIcon className="h-3 w-3" />
                            <span>{result.module}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(result.timestamp)}</span>
                          </div>
                          
                          <div className="flex gap-1">
                            {result.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                <p className="text-sm">Tente outros termos ou remova filtros</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};