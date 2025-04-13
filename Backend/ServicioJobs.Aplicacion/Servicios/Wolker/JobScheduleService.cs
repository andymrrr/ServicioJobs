using Cronos;


namespace ServicioJobs.Aplicacion.Servicios.Wolker
{
    public static class JobScheduleService
    {
        public static DateTime CalcularProximaEjecucion(string crontab)
        {
            var schedule = CronExpression.Parse(crontab);
            return schedule.GetNextOccurrence(DateTimeOffset.Now, TimeZoneInfo.Local)?.DateTime ?? DateTime.Now;
        }
    }
}
