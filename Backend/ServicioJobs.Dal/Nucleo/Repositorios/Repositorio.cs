using Microsoft.EntityFrameworkCore;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Dal.Nucleo.Paginacion.Interfaces;
using ServicioJobs.Dal.Nucleo.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ServicioJobs.Dal.Contexto;

namespace ServicioJobs.Dal.Nucleo.Repositorios
{
    public class Repositorio<T> : IRepositorio<T> where T : class
    {
        protected readonly ContextServicioJobs _context;
        public Repositorio(ContextServicioJobs context)
        {
            _context = context;
        }

        public void Agregar(T entidad)
        {
            _context.Set<T>().Add(entidad);
        }
        public void AgregarColeccion(IEnumerable<T> entidad)
        {
            _context.Set<T>().AddRange(entidad);
        }
        public void Eliminar(T entidad)
        {
            var entry = _context.Entry(entidad);
            if (entry.State == EntityState.Detached)
            {
                _context.Set<T>().Attach(entidad);
            }
            _context.Set<T>().Remove(entidad);
        }

        public IEnumerable<T> Buscar()
        {
            return _context.Set<T>().AsEnumerable<T>();
        }

        public IEnumerable<T> Buscar(Expression<Func<T, bool>> accion)
        {
            return _context.Set<T>().Where(accion).AsEnumerable<T>();
        }
        public T BuscarPorId(int Id)
        {
            return _context.Set<T>().Find(Id)!;
        }
        public IEnumerable<T> BuscarTodo()
        {
            return _context.Set<T>().AsEnumerable();
        }


        public IQueryable<T> Consultar()
        {
            return _context.Set<T>().AsQueryable<T>();
        }
        public IQueryable<T> Consultar(Expression<Func<T, bool>> accion)
        {
            return _context.Set<T>().Where(accion).AsQueryable<T>();
        }
        public void Actualizar(T entidad)
        {
            _context.Set<T>().Update(entidad);
        }
        #region Metodos Asincronos
        public async Task AgregarAsincrono(T entidad)
        {
            await _context.Set<T>().AddAsync(entidad);
        }
        public async Task ActualizarAsincrono(T entidad)
        {
            _context.Set<T>().Update(entidad);

        }


        public async Task<IQueryable<T>> BuscarAsincrono(Expression<Func<T, bool>> accion)
        {
            return _context.Set<T>().Where(accion);
        }

        public async Task<T> BuscarUnicoAsincrono(Expression<Func<T, bool>> accion)
        {
            return await _context.Set<T>().Where(accion).FirstOrDefaultAsync();
        }

        public async Task<bool> ExisteAsincrono(Expression<Func<T, bool>> accion)
        {
            return await _context.Set<T>().AnyAsync(accion);
        }

        public async Task<IReadOnlyList<T>> BuscarTodoAsincrono()
        {
            return await _context.Set<T>().ToListAsync();
        }
        public async Task<T> BuscarPorIdAsincrono(int id)
        {
            return (await _context.Set<T>().FindAsync(id))!;
        }


        #endregion

        #region Paginacion
        public async Task<IReadOnlyList<T>> BuscarTodaEspecificificaciones(IPaginacion<T> especificacion)
        {
            return await AplicarEspecificaciones(especificacion).ToListAsync();
        }

        public async Task<int> CantidadAsincrona(IPaginacion<T> especificacion)
        {
            return await AplicarEspecificaciones(especificacion).CountAsync();
        }
        public IQueryable<T> AplicarEspecificaciones(IPaginacion<T> especificacion)
        {
            return EvaluarPaginacion<T>.MostrarConsulta(_context.Set<T>().AsQueryable(), especificacion);
        }
        #endregion
    }
}
