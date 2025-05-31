using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ServicioJobs.Dal.Contexto;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Dal.Nucleo.Repositorios;
using ServicioJobs.Modelos.Configuracion;
using System.Text;

namespace ServicioJobs.Dal
{
    public static class Extension
    {
        public static void AddServicioDatos(this IServiceCollection servicio, IConfiguration configuracion)
        {
            servicio.AddHttpContextAccessor();
            servicio.AddScoped<IServicioJobsUoW, ServicioJobsUoW>();
            servicio.AddScoped(typeof(IRepositorio<>), typeof(Repositorio<>));
            servicio.AddScoped<IAutenticacion, Autenticacion>();
            servicio.AddJWT(configuracion);
            servicio.AddPostgres(configuracion);

        }



        private static void AddPostgres(this IServiceCollection servicio, IConfiguration configuracion)
        {
            servicio.AddDbContext<ContextServicioJobs>(options =>
                options.UseNpgsql(configuracion.GetConnectionString("ServicioJobs"),
                   sqlOptions => sqlOptions.MigrationsAssembly(typeof(ContextServicioJobs).Assembly.GetName().Name)));
        }
        public static async Task AplicarMigracion(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();
                try
                {
                    var context = services.GetRequiredService<ContextServicioJobs>();

                    // Migrar la base de datos y cargar datos iniciales de manera asíncrona
                    await context.Database.MigrateAsync();

                }
                catch (Exception ex)
                {
                    var logger = loggerFactory.CreateLogger("ServicioJobs.Dal.Extension");
                    logger.LogError(ex, "Ocurrió un error durante la migración de la base de datos.");
                }
            }
        }
        private static void AddJWT(this IServiceCollection servicio, IConfiguration configuracion)
        {
            servicio.Configure<ConfiguracionJWT>(configuracion.GetSection("ConfiguracionJwt"));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuracion["ConfiguracionJwt:Llave"]!));
            servicio.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opcion =>
            {
                opcion.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });
        }
        public static void AddCors(this IServiceCollection servicios, IConfiguration configuracion)
        {
            servicios.AddCors(opcion =>
            {
                opcion.AddPolicy("CorsPoolicy", constructor => constructor.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            });
        }


    }
}
