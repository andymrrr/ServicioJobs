namespace ServicioJobs.Modelos.Configuracion
{
    public class ConfiguracionJWT
    {
        public string? Llave { get; set; }
        public string? Asunto { get; set; }
        public string? Audiencia { get; set; }
        public decimal DuracionMinuto { get; set; }
        public TimeSpan TiempoExpira { get; set; }
    }
}
