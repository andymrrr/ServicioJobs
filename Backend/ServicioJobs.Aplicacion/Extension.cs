using AutoMapper;
using FluentValidation;
using Hangfire;
using Hangfire.PostgreSql;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServicioJobs.Aplicacion.Mapeo;
using ServicioJobs.Aplicacion.Middleware;
using ServicioJobs.Aplicacion.Servicios.Implementacion;
using ServicioJobs.Aplicacion.Servicios.Interfaz;
using System.Reflection;

namespace ServicioJobs.Aplicacion
{
    public static class Extension
    {
        public static void AddServicioAplicacion(this IServiceCollection servicio, IConfiguration config)
        {
            servicio.AddMemoryCache();
            servicio.AddSingleton<ICacheService, CacheService>();
            servicio.AddConfigFluentValidation();
            servicio.AddMediatr();
            servicio.AddAutoMapper();
        }

        private static void AddMediatr(this IServiceCollection servicio)
        {
            servicio.AddMediatR(opcion => opcion.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
        }

        private static void AddAutoMapper(this IServiceCollection servicio)
        {
            var cofiguracionMapeo = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MapeoPerfil());
            });
            IMapper mapeo = cofiguracionMapeo.CreateMapper();
            servicio.AddSingleton(mapeo);
        }
        public static void AddConfigFluentValidation(this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        }
        public static void AddHFire(this IServiceCollection services, IConfiguration configuration)
        {
           
            var connectionString = configuration.GetConnectionString("ServicioJobs");

            services.AddScoped<JobExecutor>();
            services.AddHangfire(config =>
            {
                config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170) 
                      .UseSimpleAssemblyNameTypeSerializer()
                      .UseRecommendedSerializerSettings()
                      .UsePostgreSqlStorage(
                                            options => options.UseNpgsqlConnection(connectionString),
                                            new PostgreSqlStorageOptions
                                            {
                                                SchemaName = "hangfire",
                                                PrepareSchemaIfNecessary = true
                                            }
                            );
                      });

            
            services.AddHangfireServer();
            RecurringJob.AddOrUpdate<JobExecutor>(
                "ejecutar-jobs-programados",
                x => x.EjecutarJobs(),
                "* * * * *" // Cada minuto
            );

        }
    }

}
