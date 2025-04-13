

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Modelos;

namespace ServicioJobs.Dal.Contexto.Configuracion
{
    public class HistoricoConfiguracion : IEntityTypeConfiguration<Historico>
    {
        public void Configure(EntityTypeBuilder<Historico> entity)
        {
            entity.ToTable("historico");

            entity.HasKey(j => j.IdHistorico);

            entity.Property(j => j.IdProgramado)
                .IsRequired();

            entity.Property(j => j.Estado)
                .IsRequired();

            entity.Property(j => j.FechaEjecucion)
                .IsRequired();

            entity.Property(j => j.FechaEjecucionFin);

            entity.Property(j => j.EstadoHttp)
                .IsRequired();

            entity.Property(j => j.MensajeError)
                .HasMaxLength(1000); 

            
            entity.HasOne(j => j.Programado)
                .WithMany(jp => jp.Historicos) 
                .HasForeignKey(j => j.IdHistorico)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
