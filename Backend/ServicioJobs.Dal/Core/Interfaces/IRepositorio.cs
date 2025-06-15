using ServicioJobs.Dal.Core.Paginacion.Interfaces;
using System.Linq.Expressions;

namespace ServicioJobs.Dal.Core.Interfaces
{
    public interface IRepositorio<T> where T : class
    {
        IEnumerable<T> Buscar();
        IEnumerable<T> Buscar(Expression<Func<T, bool>> predicate);
        T BuscarPorId(int Id);
        IEnumerable<T> BuscarTodo();
        IQueryable<T> Consultar();
        IQueryable<T> Consultar(Expression<Func<T, bool>> predicate);
        void Agregar(T entity);
        void AgregarColeccion(IEnumerable<T> entidad);
        void Eliminar(T entity);
        void Actualizar(T entity);

        #region Metodos Asincrono
        Task AgregarAsincrono(T entidad);
        Task ActualizarAsincrono(T entidad);
        Task EliminarAsincrono(T entidad);
        Task<bool> ExisteAsincrono(Expression<Func<T, bool>> accion);
        Task<T> BuscarUnicoAsincrono(Expression<Func<T, bool>> accion);
        Task<IQueryable<T>> BuscarAsincrono(Expression<Func<T, bool>> accion);
        Task<T> BuscarPorIdAsincrono(int id);

        Task<IReadOnlyList<T>> BuscarTodoAsincrono();
        #endregion

        #region Paginacion
        Task<IReadOnlyList<T>> BuscarTodaEspecificaciones(IPaginacion<T> especificacion);
        Task<int> CantidadAsincrona(IPaginacion<T> especificacion);
        #endregion
    }
}
