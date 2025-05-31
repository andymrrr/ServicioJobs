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


        }

    }
}
