using Cronos;
using FluentValidation;
using ServicioJobs.Modelos.Enums;
using System.Text.RegularExpressions;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.JobProgramados
{
    public class AgregarJobProgramadoValidator : AbstractValidator<AgregarJobProgramadoComand>
    {
        public AgregarJobProgramadoValidator()
        {

            RuleFor(x => x.Nombre)
                .NotEmpty()
                .WithMessage("El nombre es obligatorio")
                .MaximumLength(200)
                .WithMessage("El nombre no puede exceder 200 caracteres");

            RuleFor(x => x.Descripcion)
                .MaximumLength(1000)
                .WithMessage("La descripción no puede exceder 1000 caracteres");

            RuleFor(x => x.Url)
                .NotEmpty()
                .WithMessage("La URL es obligatoria")
                .MaximumLength(500)
                .WithMessage("La URL no puede exceder 500 caracteres")
                .Must(BeValidUrl)
                .WithMessage("La URL debe tener un formato válido");

            RuleFor(x => x.Crontab)
                .NotEmpty()
                .WithMessage("El crontab es obligatorio")
                .MaximumLength(100)
                .WithMessage("El crontab no puede exceder 100 caracteres")
                .Must(BeValidCrontab)
                .WithMessage("El crontab debe tener un formato válido. Ejemplo: '0 9 * * 1-5' (9 AM de lunes a viernes)");

            RuleFor(x => x.CorreoNotificar)
                .MaximumLength(300)
                .WithMessage("El correo no puede exceder 300 caracteres")
                .EmailAddress()
                .When(x => !string.IsNullOrEmpty(x.CorreoNotificar))
                .WithMessage("El correo debe tener un formato válido");

            RuleFor(x => x.ReintentosPermitidos)
                .GreaterThanOrEqualTo(0)
                .When(x => x.ReintentosPermitidos.HasValue)
                .WithMessage("Los reintentos permitidos deben ser mayor o igual a 0");

            RuleFor(x => x.PeriodoReintento)
                .GreaterThan(0)
                .When(x => x.PeriodoReintento.HasValue)
                .WithMessage("El período de reintento debe ser mayor a 0 minutos");

            RuleFor(x => x.Timeout)
                .GreaterThan(0)
                .When(x => x.Timeout.HasValue)
                .WithMessage("El timeout debe ser mayor a 0 segundos");

            RuleFor(x => x.MetodoHttp)
                .IsInEnum()
                .WithMessage("El método HTTP debe ser válido (GET, POST, PUT, DELETE, PATCH)");

            RuleFor(x => x.JobParametro)
                .NotNull()
                .WithMessage("La lista de parámetros no puede ser nula");

            RuleForEach(x => x.JobParametro)
                .SetValidator(new JobParametroItemValidator());

            // Validación condicional: si hay reintentos, debe haber período
            RuleFor(x => x.PeriodoReintento)
                .NotNull()
                .When(x => x.ReintentosPermitidos.HasValue && x.ReintentosPermitidos > 0)
                .WithMessage("El período de reintento es obligatorio cuando se especifican reintentos permitidos");
        }

        private static bool BeValidUrl(string? url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            return Uri.TryCreate(url, UriKind.Absolute, out var uriResult) &&
                   (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }

        private static bool BeValidCrontab(string? crontab)
        {
            if (string.IsNullOrEmpty(crontab))
                return false;

            try
            {
                var cronExpression = CronExpression.Parse(crontab);
                // Verificar que la próxima ejecución sea válida
                var nextExecution = cronExpression.GetNextOccurrence(DateTimeOffset.UtcNow, TimeZoneInfo.Utc);
                return nextExecution.HasValue;
            }
            catch
            {
                return false;
            }
        }
    }

    public class JobParametroItemValidator : AbstractValidator<JobParametroItem>
    {
        public JobParametroItemValidator()
        {
            RuleFor(x => x.Propiedad)
                .NotEmpty()
                .WithMessage("La propiedad del parámetro es obligatoria")
                .MaximumLength(200)
                .WithMessage("La propiedad no puede exceder 200 caracteres");

            RuleFor(x => x.Valor)
                .NotEmpty()
                .WithMessage("El valor del parámetro es obligatorio")
                .MaximumLength(1000)
                .WithMessage("El valor no puede exceder 1000 caracteres");

            RuleFor(x => x.Tipo)
                .IsInEnum()
                .WithMessage("El tipo de parámetro debe ser válido (Query o Header)");
        }
    }
}