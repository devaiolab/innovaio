import { useEffect, useState } from 'react';
import { databaseSeeder } from '@/services/databaseSeeder';
import { realDataService } from '@/services/realDataService';

export function useDataInitialization() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeData() {
      try {
        console.log('🚀 Inicializando sistema INNOVAIO...');
        
        // Verificar se já existem dados
        const summary = await databaseSeeder.getSeededDataSummary();
        
        if (summary.alerts === 0) {
          console.log('📊 Realizando seed inicial do banco...');
          const seedResult = await databaseSeeder.seedDatabase();
          
          if (!seedResult.success) {
            throw new Error(`Falha no seed: ${seedResult.error}`);
          }
        }
        
        // Iniciar sincronização automática
        console.log('🔄 Iniciando sincronização automática...');
        await realDataService.startAutoSync();
        
        setIsInitialized(true);
        console.log('✅ Sistema INNOVAIO inicializado com sucesso!');
        
      } catch (err: any) {
        console.error('❌ Erro na inicialização:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    initializeData();

    // Cleanup on unmount
    return () => {
      realDataService.stopAutoSync();
    };
  }, []);

  return {
    isInitialized,
    isLoading,
    error
  };
}