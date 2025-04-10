

namespace ServicioJobs.Dal.Nucleo.Paginacion.Modelos
{
    public class PaginacionVm<T> where T : class
    {
        public int TotalRegistros { get; set; } // Total de registros en la base de datos
        public int PaginaActual { get; set; } // Índice de la página actual (1-based)
        public int CantidadRegistroPorPagina { get; set; } // Tamaño de la página (número de elementos por página)
        public IReadOnlyList<T>? Datos { get; set; } // Datos de la página actual

        public int TotalPaginas => (int)Math.Ceiling((double)TotalRegistros / CantidadRegistroPorPagina); // Total de páginas
    }
}
