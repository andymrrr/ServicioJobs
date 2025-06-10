using Microsoft.EntityFrameworkCore;
using ServicioJobs.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Dal.Contexto
{
    public class ContextServicioJobs : DbContext
    {
        public ContextServicioJobs(DbContextOptions<ContextServicioJobs> options) : base(options) { }

        public DbSet<Historico> Historico { get; set; }
        public DbSet<Metodo> Metodo { get; set; }
        public DbSet<Parametro> Parametro { get; set; }
        public DbSet<Programado> Programado { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            
            // Configurar DateTime para PostgreSQL - Conversión manual
            ConfigurarDateTimeParaPostgreSQL(modelBuilder);
        }

        /// <summary>
        /// Configura las propiedades DateTime para PostgreSQL
        /// </summary>
        private void ConfigurarDateTimeParaPostgreSQL(ModelBuilder modelBuilder)
        {
            // Configurar todas las propiedades DateTime para usar UTC
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var dateTimeProperties = entityType.GetProperties()
                    .Where(p => p.ClrType == typeof(DateTime) || p.ClrType == typeof(DateTime?));

                foreach (var property in dateTimeProperties)
                {
                    // Configurar conversión de DateTime a UTC
                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(new Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter<DateTime, DateTime>(
                            v => v.Kind == DateTimeKind.Utc ? v : DateTime.SpecifyKind(v, DateTimeKind.Utc),
                            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)));
                    }
                    else if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(new Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter<DateTime?, DateTime?>(
                            v => v.HasValue ? (v.Value.Kind == DateTimeKind.Utc ? v.Value : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc)) : v,
                            v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v));
                    }
                }
            }
        }

    }
}
