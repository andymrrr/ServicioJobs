
using AutoMapper;
using Bogus;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Dal.Core.Interfaces;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Query.BuscarProgramadosGuid
{
    public class BuscarProgramadosGuidHandle : IRequestHandler<BuscarProgramadosGuidQuery, RespuestaServicio<ProgramadoDto>>
    {
        private readonly IServicioJobsUoW _context;
        private readonly IMapper _mapper;
        public BuscarProgramadosGuidHandle(IMapper mapper, IServicioJobsUoW context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<RespuestaServicio<ProgramadoDto>> Handle(BuscarProgramadosGuidQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var programado = await _context.Programado.Consultar(d=> d.IdProgramado == request.Guid).ToListAsync();

                if (programado is null)
                {
                    return RespuestaServicio<ProgramadoDto>.Exito("El Job Programado no se encuentra");
                }

                var dto = _mapper.Map<ProgramadoDto>(programado);

                return RespuestaServicio<ProgramadoDto>.Exito(dto);
            }
            catch (Exception ex)
            {

                return RespuestaServicio<ProgramadoDto>.Fallo(ex);
            }
            

        }
    }
}
