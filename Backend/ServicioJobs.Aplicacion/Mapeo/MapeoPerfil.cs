

using AutoMapper;
using ServicioJobs.Aplicacion.Funcionalidad.Libros.Vm;
using ServicioJobs.Modelos;

namespace ServicioJobs.Aplicacion.Mapeo
{
    internal class MapeoPerfil : Profile
    {
        public MapeoPerfil()
        {
            CreateMap<Libro,LibroVm>().ReverseMap();
        }
    }
}
