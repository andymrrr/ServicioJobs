

namespace ServicioJobs.Dal.Core.Paginacion
{
    public class PaginacionParametro
    {
        public string? Ordenar { get; set; }
        public int Pagina { get; set; } = 1; 

        public const int CantidadRegistroPorPaginaMaximo = 50; 

        private int _tamanoPagina = 10; 
        public int CantidadRegistroPorPagina
        {
            get => _tamanoPagina;
            set
            {
                if (value <= 0)
                {
                    _tamanoPagina = 10; 
                }
                else
                {
                    _tamanoPagina = value > CantidadRegistroPorPaginaMaximo
                        ? CantidadRegistroPorPaginaMaximo
                        : value; 
                }
            }
        }

        public string? Busqueda { get; set; } 
    }
}
