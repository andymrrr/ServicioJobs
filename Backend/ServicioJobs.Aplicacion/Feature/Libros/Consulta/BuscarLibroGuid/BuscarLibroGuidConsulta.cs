using MediatR;
using ServicioJobs.Aplicacion.Funcionalidad.Libros.Vm;


namespace ServicioJobs.Aplicacion.Feature.Libros.Consulta.BuscarLibroGuid
{
    public class BuscarLibroGuidConsulta : IRequest<LibroVm>
    {
        public Guid? Guid { get; set; }
        public BuscarLibroGuidConsulta(Guid? libroGuid)
        {

            if (libroGuid is null)
            {
                throw new ArgumentException("El ID del libro no puede estar vacio", nameof(libroGuid));
            }

            Guid = libroGuid;
        }

    }
}
