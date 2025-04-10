using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
        public static IServiceCollection AddServicioDatos(this IServiceCollection servicio, IConfiguration configuracion)
        {
            servicio.AddHttpContextAccessor();
            servicio.AddJWT(configuracion);
            servicio.AddSQL(configuracion);
                
            servicio.AddScoped<IServicioJobsUoW, ServicioJobsUoW>();
            servicio.AddScoped(typeof(IRepositorio<>), typeof(Repositorio<>));
            servicio.AddScoped<IAutenticacion, Autenticacion>();

            return servicio;
        }

        private static void AddSQL(this IServiceCollection servicio, IConfiguration configuracion)
        {
            servicio.AddDbContext<ContextServicioJobs>(options =>
                options.UseSqlServer(configuracion.GetConnectionString("ServicioJobs"),
                    sqlOptions => sqlOptions.MigrationsAssembly(typeof(ContextServicioJobs).Assembly.FullName)));
        }

        private static void AddPostgres(this IServiceCollection servicio, IConfiguration configuracion)
        {
            servicio.AddDbContext<ContextServicioJobs>(options =>
                options.UseNpgsql(configuracion.GetConnectionString("ServicioJobs"),
                    sqlOptions => sqlOptions.MigrationsAssembly(typeof(ContextServicioJobs).Assembly.FullName)));
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
        public static void  AddCors(this IServiceCollection servicios, IConfiguration configuracion)
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
