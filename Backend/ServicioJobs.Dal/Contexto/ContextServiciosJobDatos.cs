using Microsoft.Extensions.Logging;
using ServicioJobs.Dal.CargaInicial;

namespace ServicioJobs.Dal.Contexto
{
    public class ContextServiciosJobDatos
    {
        public static async Task CargardatosAsincronos(ContextServicioJobs dbContext, ILoggerFactory logger)
        {
            try
            {
                var log = logger.CreateLogger<ContextServiciosJobDatos>();
                
                await MetodosSeeder.SembrarMetodosAsync(dbContext, log);
            }
            catch (Exception ex)
            {
                var log = logger.CreateLogger<ContextServiciosJobDatos>();
                log.LogError(ex, "Error durante la carga inicial de datos: {Message}", ex.Message);
                throw;
            }
        }
    }
}
