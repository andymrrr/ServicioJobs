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
    public class MetodoConfiguracion : IEntityTypeConfiguration<Metodo>
    {
        public void Configure(EntityTypeBuilder<Metodo> entity)
        {
            entity.ToTable("metodo");

            entity.HasKey(m => m.IdMetodo);

            entity.Property(m => m.Nombre)
                .IsRequired()
                .HasMaxLength(200);

            
            entity.HasMany(m => m.Programados)
                .WithOne(p => p.Metodo) 
                .HasForeignKey(p => p.IdMetodo) 
                .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}
