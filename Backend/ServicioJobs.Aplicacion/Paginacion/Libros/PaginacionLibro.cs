using ServicioJobs.Dal.Nucleo.Paginacion;
using ServicioJobs.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Aplicacion.Paginacion.Libros
{
    public class PaginacionLibro : PaginacionBase<Libro>
    {
        public PaginacionLibro(PaginacionLibroParametro parametro) : base(parametro.ConstruirFiltro())
        {
            // Incluir relaciones necesarias
            // AgregarIncluir(c => c.Subcategorias!);
            // AgregarIncluir(c => c.Artes!);

            // Configurar paginación
            AplicarPaginacion(parametro.Pagina, parametro.CantidadRegistroPorPagina);

            // Aplicar ordenamiento
            AplicarOrdenamiento(parametro.Ordenar);
        }

        private void AplicarOrdenamiento(string? orden)
        {
            if (string.IsNullOrEmpty(orden))
            {
                AgregarOrdenarPor(c => c.Id); // Ordenar por ID por defecto
                return;
            }

            // Aplicar ordenamiento basado en el parámetro
            var ordenamiento = orden.ToLower();
            if (ordenamiento == "nombreasc")
            {
                AgregarOrdenarPor(c => c.Titulo!);
            }
            else if (ordenamiento == "nombredesc")
            {
                AgregarOrdenarDescendiente(c => c.Titulo!);
            }
            else
            {
                AgregarOrdenarPor(c => c.Id); // Ordenar por ID si no coincide con ningún caso
            }
        }
    }
}
