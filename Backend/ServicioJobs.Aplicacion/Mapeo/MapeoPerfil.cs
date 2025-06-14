

using AutoMapper;
using ServicioJobs.Aplicacion.Feature.JobMetodo.Dtos;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Modelos;

namespace ServicioJobs.Aplicacion.Mapeo
{
    internal class MapeoPerfil : Profile
    {
        public MapeoPerfil()
        {
            CreateMap<Programado, ProgramadoPaginado>()
            .ForMember(dest => dest.MetodoHttp, opt => opt.MapFrom(src => src.Metodo.Nombre))
                .ReverseMap();
            CreateMap<Metodo, MetodosDto>().ReverseMap();
        }
    }
}
