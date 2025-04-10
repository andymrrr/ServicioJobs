using ServicioJobs.Modelos;


namespace ServicioJobs.Dal.Nucleo.Interfaces
{
    public interface IAutenticacion
    {
        string ObtenerUsuarioSesion();
        string? CrearToken(Usuario usuario, IList<string>? roles);
    }
}
