import { databaseSeeder } from "@/services/databaseSeeder";
import { realDataService } from "@/services/realDataService";

export async function initializeApplicationData() {
  console.log('🚀 Inicializando dados da aplicação...');
  
  try {
    // Seed inicial do banco
    const seedResult = await databaseSeeder.seedDatabase();
    
    if (seedResult.success) {
      console.log('✅ Database seeded successfully');
      
      // Iniciar sincronização automática
      await realDataService.startAutoSync();
      console.log('✅ Real-time sync started');
      
      return { success: true, message: 'Dados inicializados com sucesso' };
    } else {
      throw new Error(seedResult.error);
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar dados:', error);
    return { success: false, error: error.message };
  }
}

// Auto-initialize when app starts
if (typeof window !== 'undefined') {
  // Delay to ensure app is fully loaded
  setTimeout(() => {
    initializeApplicationData().then(result => {
      if (result.success) {
        console.log('✅ Aplicação inicializada com dados reais');
      } else {
        console.error('❌ Falha na inicialização:', result.error);
      }
    });
  }, 2000);
}