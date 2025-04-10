using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ServicioJobs.Aplicacion.Servicios.Interfaz;
using System.Security.Claims;
using Newtonsoft.Json;
using ServicioJobs.Aplicacion.Servicios.Utilitario;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class FiltroRegistroSolicitudes : ActionFilterAttribute
{
    private readonly ILoggerService _logger;

    public FiltroRegistroSolicitudes(ILoggerService logger)
    {
        _logger = logger;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!IsApiController(context)) return; // Verifica si es un controlador de API

        var usuario = GetUsuario(context);
        var endpoint = $"{context.HttpContext.Request.Method}: {context.HttpContext.Request.Path}";
        var parametros = context.ActionArguments;

        if (parametros.Any())
        {
            _logger.LogRequestWithParams($"{endpoint} | USUARIO: {usuario} | REQUEST | PARAMETROS: ", parametros);
        }
        else
        {
            _logger.LogRequestWithParams($"{endpoint} | USUARIO: {usuario} | REQUEST", "No se enviaron parámetros");
        }
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (!IsApiController(context)) return; // Verifica si es un controlador de API

        var usuario = GetUsuario(context);
        var endpoint = $"{context.HttpContext.Request.Method}: {context.HttpContext.Request.Path}";

        object response;

        switch (context.Result)
        {
            case ObjectResult objResult when objResult.Value != null:
                response = objResult.Value;
                break;

            case JsonResult jsonResult when jsonResult.Value != null:
                response = jsonResult.Value;
                break;

            default:
                response = "Sin respuesta";
                break;
        }

        var settings = new JsonSerializerSettings
        {
            ContractResolver = new ExclusionPropiedadesLog(),
            Formatting = Formatting.None
        };

        // Serializamos con el ContractResolver personalizado
        var responseFiltrado = JsonConvert.SerializeObject(response, settings);

        _logger.LogRequestWithParams($"{endpoint} | USUARIO: {usuario} | RESPONSE", responseFiltrado);

        if (context.Exception != null)
        {
            _logger.LogError($"Error en {endpoint} | USUARIO: {usuario}: | RESPONSE {context.Exception.Message}", context.Exception);
        }
    }

    private bool IsApiController(FilterContext context)
    {
        return context.ActionDescriptor.EndpointMetadata.Any(meta => meta is ApiControllerAttribute);
    }

    private string GetUsuario(FilterContext context)
    {
        return context.HttpContext.User.Identity?.IsAuthenticated == true
            ? context.HttpContext.User.FindFirst(ClaimTypes.Name)?.Value ?? "Usuario desconocido"
            : "Usuario no autenticado";
    }
}
