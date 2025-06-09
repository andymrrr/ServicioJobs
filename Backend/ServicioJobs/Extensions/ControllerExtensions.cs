using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Modelos.Enums;
using ServicioJobs.Modelos.Utilitarios;
using System.Net;

namespace ServicioJobs.Extensions
{
    public static class ControllerExtensions
    {
        public static ActionResult<RespuestaServicio<T>> ToActionResult<T>(
            this ControllerBase controller, 
            RespuestaServicio<T> respuesta)
        {
            if (respuesta.Completado)
            {
                return controller.Ok(respuesta);
            }

        
            return respuesta.TipoError switch
            {
                TipoError.NoEncontrado => controller.NotFound(respuesta),
                TipoError.Conflicto => controller.Conflict(respuesta),
                TipoError.Validacion => controller.BadRequest(respuesta),
                TipoError.NoAutorizado => controller.Unauthorized(respuesta),
                TipoError.Prohibido => controller.StatusCode((int)HttpStatusCode.Forbidden, respuesta),
                TipoError.ErrorInterno => controller.StatusCode((int)HttpStatusCode.InternalServerError, respuesta),
                _ => controller.BadRequest(respuesta) 
            };
        }

        
        public static ActionResult<RespuestaServicio<T>> ToCreatedResult<T>(
            this ControllerBase controller,
            RespuestaServicio<T> respuesta,
            string actionName,
            object routeValues)
        {
            if (respuesta.Completado)
            {
                return controller.CreatedAtAction(actionName, routeValues, respuesta);
            }

            return controller.ToActionResult(respuesta);
        }

       
        public static ActionResult<RespuestaServicio<T>> ToAcceptedResult<T>(
            this ControllerBase controller,
            RespuestaServicio<T> respuesta)
        {
            if (respuesta.Completado)
            {
                return controller.Accepted(respuesta);
            }

            return controller.ToActionResult(respuesta);
        }
    }
} 