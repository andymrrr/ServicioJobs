

using AutoMapper;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Modelos;

namespace ServicioJobs.Aplicacion.Mapeo
{
    internal class MapeoPerfil : Profile
    {
        public MapeoPerfil()
        {
            CreateMap<Programado, ProgramadoPaginado>().ReverseMap();
            
        }
    }
}
