using ServicioJobs.Dal.Nucleo.Paginacion;
using ServicioJobs.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Aplicacion.Paginacion.Libros
{
    public class PaginacionLibroParametro : PaginacionParametro
    {
        public Guid? LibroGuid { get; set; }
        public string? titulo { get; set; }

        // Método para construir el filtro de búsqueda
        public Expression<Func<Libro, bool>> ConstruirFiltro()
        {
            return c =>
                (!LibroGuid.HasValue || c.Id == LibroGuid) &&
                (string.IsNullOrEmpty(titulo) || c.Titulo!.Contains(titulo)) &&
                (string.IsNullOrEmpty(Busqueda) || c.Titulo!.ToLower().Contains(Busqueda.ToLower()));
        }
    }
}
