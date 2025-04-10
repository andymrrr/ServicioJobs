using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Dal.Nucleo.Paginacion
{
    public class PaginacionParametro
    {
        public string? Ordenar { get; set; }
        public int Pagina { get; set; } = 1; // Página inicial por defecto

        public const int CantidadRegistroPorPaginaMaximo = 50; // Tamaño máximo de la página

        private int _tamanoPagina = 10; // Valor por defecto inicial
        public int CantidadRegistroPorPagina
        {
            get => _tamanoPagina;
            set
            {
                if (value <= 0)
                {
                    _tamanoPagina = 10; // Asignar el valor por defecto si se establece en 0 o menor
                }
                else
                {
                    _tamanoPagina = value > CantidadRegistroPorPaginaMaximo
                        ? CantidadRegistroPorPaginaMaximo
                        : value; // Limitar el tamaño de la página al máximo permitido
                }
            }
        }

        public string? Busqueda { get; set; } // Término de búsqueda
    }
}
