using FluentValidation;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.EjecutarJobProgramado
{
    public class EjecutarJobProgramadoValidator : AbstractValidator<EjecutarJobProgramadoCommand>
    {
        public EjecutarJobProgramadoValidator()
        {
            RuleFor(x => x.IdProgramado)
                .NotEmpty()
                .WithMessage("El IdProgramado es obligatorio");

            RuleFor(x => x.FechaEjecucionProgramada)
                .GreaterThan(DateTime.Now)
                .When(x => !x.EjecutarInmediatamente && x.FechaEjecucionProgramada.HasValue)
                .WithMessage("La fecha de ejecución programada debe ser mayor a la fecha actual");

            RuleFor(x => x)
                .Must(x => x.EjecutarInmediatamente || x.FechaEjecucionProgramada.HasValue)
                .WithMessage("Si no se ejecuta inmediatamente, debe especificar una fecha de ejecución programada");
        }
    }
} 