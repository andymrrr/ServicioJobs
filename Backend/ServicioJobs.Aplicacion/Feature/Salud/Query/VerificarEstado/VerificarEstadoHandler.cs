using MediatR;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Aplicacion.Feature.Salud.Dto;
using ServicioJobs.Dal.Contexto;

namespace ServicioJobs.Aplicacion.Feature.Salud.Query.VerificarEstado
{
    internal class VerificarEstadoHandler : IRequestHandler<VerificarEstadoQuery, ControlSalud>
    {
        private readonly ContextServicioJobs _contextServicioJobs;
        public VerificarEstadoHandler(ContextServicioJobs contextServicioJobs)
        {
            _contextServicioJobs = contextServicioJobs;
        }
        public async Task<ControlSalud> Handle(VerificarEstadoQuery request, CancellationToken cancellationToken)
        {
            var response = new ControlSalud();

            try
            {
                await _contextServicioJobs.Database.ExecuteSqlRawAsync("SELECT 1", cancellationToken);
                response.Estado = "Saludable";
                response.BaseDeDatos = "Conectada";
            }
            catch
            {
                response.Estado = "No saludable";
                response.BaseDeDatos = "Desconectada";
            }

            return response;
        }
    }
}
