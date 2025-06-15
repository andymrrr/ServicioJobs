using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Dal.Contexto.Configuracion
{
    public class ProgramadoConfiguracion : IEntityTypeConfiguration<Programado>
    {
        public void Configure(EntityTypeBuilder<Programado> entity)
        {
            entity.ToTable("programado");

            entity.HasKey(p => p.IdProgramado);

            entity.Property(p => p.Nombre)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(p => p.Descripcion)
                .HasMaxLength(1000);

            entity.Property(p => p.Url)
                .IsRequired()
                .HasMaxLength(500);

            entity.Property(p => p.Crontab)
                .HasMaxLength(100);

            entity.Property(p => p.CorreoNotificar)
                .HasMaxLength(300);

            entity.Property(p => p.FechaEjecucion);
            entity.Property(p => p.FechaReintento);
            entity.Property(p => p.UltimaEjecucion);

            entity.Property(p => p.Timeout);
            entity.Property(p => p.EstadoEjecucion)
                .IsRequired();

            entity.Property(p => p.UltimaEjecucionExitosa);
            entity.Property(p => p.ReintentosPermitidos);
            entity.Property(p => p.PeriodoReintento);
            entity.Property(p => p.Reintentos);

            entity.Property(p => p.Habilitado)
                .IsRequired();
        }
    }

}
