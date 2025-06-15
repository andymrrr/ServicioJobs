using ServicioJobs.Modelos;


namespace ServicioJobs.Dal.Core.Interfaces
{
    public interface IAutenticacion
    {
        string ObtenerUsuarioSesion();
        string? CrearToken(Usuario usuario, IList<string>? roles);
    }
}
