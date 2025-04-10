using FluentValidation;
using ServicioJobs.Aplicacion.Model;
using System.Text.Json;

namespace ServicioJobs.Middleware
{
    public class ValidationExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ValidationExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";

                var errores = ex.Errors
                    .GroupBy(e => e.PropertyName)
                    .SelectMany(g => g.Select(e => $"{e.PropertyName}: {e.ErrorMessage}"))
                    .ToList();

                var respuesta = RespuestaServicio<object>.Fallo(
                    mensaje: "Uno o más errores de validación ocurrieron.",
                    errorTecnico: ex.ToString()
                );

                respuesta.Errores = errores;

                await context.Response.WriteAsync(JsonSerializer.Serialize(respuesta));
            }
        }
    }
}
