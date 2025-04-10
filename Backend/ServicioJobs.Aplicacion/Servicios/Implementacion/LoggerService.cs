
using Microsoft.Extensions.Configuration;
using ServicioJobs.Aplicacion.Servicios.Interfaz;

using Newtonsoft.Json;
using Serilog;
using Serilog.Events;

namespace ServicioJobs.Aplicacion.Servicios.Implementacion
{
    public class LoggerService : ILoggerService
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        public LoggerService(ILogger logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

            var logLevelString = _configuration["SerilogConfig:Level"] ?? "Information";

            // Verbose, Debug, Information, Warning, Error o Fatal para el nivel de los logs, en appsettings
            if (!Enum.TryParse(logLevelString, true, out LogEventLevel logLevel))
            {
                logLevel = LogEventLevel.Information;
            }

            var logPath = _configuration["SerilogConfig:Path"]!;
            var logShared = bool.TryParse(_configuration["SerilogConfig:Shared"], out var shared) && shared;

            _logger = new LoggerConfiguration()
                .MinimumLevel.Is(logLevel)
                .WriteTo.File(logPath,
                rollingInterval: RollingInterval.Day,
                shared: logShared)
            .CreateLogger();

        }

        public void LogError(string message, Exception? ex = null)
        {
            _logger.Error(ex, message);
        }

        public void LogInformation(string message)
        {
            _logger.Information(message);
        }

        public void LogRequestWithParams(string endpoint, object parameters)
        {
            var serializedParams = JsonConvert.SerializeObject(parameters, Formatting.None);
            _logger.Information($"ENDPOINT: {endpoint} {serializedParams}");
        }

        public void LogWarning(string message)
        {
            _logger.Warning(message);
        }
    }
}

