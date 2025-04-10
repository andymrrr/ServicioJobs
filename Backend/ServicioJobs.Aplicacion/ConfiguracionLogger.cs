using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using ServicioJobs.Aplicacion.Servicios.Implementacion;
using ServicioJobs.Aplicacion.Servicios.Interfaz;
using Serilog;

namespace ServicioJobs.Aplicacion
{
    public static class ConfiguracionLogger
    {
        public static void AgregarLogging(WebApplicationBuilder builder)
        {
       
            Log.Logger = new LoggerConfiguration()
             .ReadFrom.Configuration(builder.Configuration)
              .CreateLogger();

            builder.Host.UseSerilog(Log.Logger);
            builder.Services.AddScoped<FiltroRegistroSolicitudes>(); 
            builder.Services.AddSingleton<ILoggerService, LoggerService>();
        }
    }
}
