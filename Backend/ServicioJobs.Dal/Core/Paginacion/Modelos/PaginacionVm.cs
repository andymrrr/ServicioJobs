

namespace ServicioJobs.Dal.Core.Paginacion.Modelos
{
    public class PaginacionVm<T> where T : class
    {
        public int TotalRegistros { get; set; } 
        public int PaginaActual { get; set; }
        public int CantidadRegistroPorPagina { get; set; }
        public IReadOnlyList<T>? Datos { get; set; } 

        public int TotalPaginas => (int)Math.Ceiling((double)TotalRegistros / CantidadRegistroPorPagina);
    }
}
