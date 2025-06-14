﻿using ServicioJobs.Dal.Core.Paginacion;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Enums;
using System.Linq.Expressions;


namespace ServicioJobs.Aplicacion.Paginacion.Programados
{
    public class PaginacionProgramadoresParametro : PaginacionParametro
    {
        public string? Nombre { get; set; }
        public int? EstadoEjecucion { get; set; }
        public MetodoHttp? MetodoHttps { get; set; }


        public Expression<Func<Programado, bool>> ConstruirFiltro()
        {
            return c =>
                (!MetodoHttps.HasValue || c.MetodoHttp == MetodoHttps) && 
                (!EstadoEjecucion.HasValue || c.EstadoEjecucion == EstadoEjecucion) &&
                (string.IsNullOrEmpty(Nombre) || c.Nombre!.Contains(Nombre)) &&
                (string.IsNullOrEmpty(Busqueda) || c.Nombre!.ToLower().Contains(Busqueda.ToLower()));

        }
    }
}
