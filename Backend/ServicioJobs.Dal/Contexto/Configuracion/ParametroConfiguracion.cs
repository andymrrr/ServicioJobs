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
    public class ParametroConfiguracion : IEntityTypeConfiguration<Parametro>
    {
        public void Configure(EntityTypeBuilder<Parametro> entity)
        {
            entity.ToTable("parametro");

            entity.HasKey(p => p.IdParametroa);

            entity.Property(p => p.Propiedad)
                .IsRequired()
                .HasMaxLength(200); 

            entity.Property(p => p.Valor)
                .IsRequired()
                .HasMaxLength(1000);

            entity.Property(p => p.Tipo)
                .IsRequired();

          
            entity.HasOne(p => p.Programado)
                .WithMany(pr => pr.Parametros)
                .HasForeignKey(p => p.IdProgramado)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
