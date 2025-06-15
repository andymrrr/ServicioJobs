using Azure;
using ServicioJobs.Dal.Contexto;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Dal.Nucleo.Repositorios
{
    public class ServicioJobsUoW : IServicioJobsUoW
    {
        private ContextServicioJobs _context { get; }

        public IRepositorioProgramado Programado { get; set; }
        public IRepositorio<Parametro> Parametro { get; set; }

        public ServicioJobsUoW(ContextServicioJobs context)
        {
            _context = context;
            Programado = new RepositorioProgramado(context);
            Parametro = new Repositorio<Parametro>(context);
        }


        public void GuardarCambios()
        {
            _context.SaveChanges();
        }

        public async Task GuardarCambiosAsync()
        {
            await _context.SaveChangesAsync();
        }

        // Método para liberar recursos
        public void Dispose()
        {
            _context.Dispose();
        }

        #region Transacciones
        public async Task BeginAsync()
        {
            await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            await _context.Database.CommitTransactionAsync();
        }

        public async Task RollbackAsync()
        {
            await _context.Database.RollbackTransactionAsync();
        }
        #endregion
    }
}
