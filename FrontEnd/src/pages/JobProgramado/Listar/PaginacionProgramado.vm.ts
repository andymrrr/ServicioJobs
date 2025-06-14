
import { useCallback } from 'react';
import { PaginacionProgramadosQuery } from '../../../Core/Dominio/Model';
import { usePaginacionJob } from '../../../hooks/JobProgramado/usePaginacionJob';
import { useEstadoPaginacion } from '../../../hooks/Paginacion/useEstadoPaginacion';

// Parámetros iniciales
const PARAMETROS_INICIALES: PaginacionProgramadosQuery = {
  pagina: 1,
  cantidadRegistroPorPagina: 10,
  busqueda: '',
  nombre: '',
  ordenar: 'nombre',
};

export function usePaginacionProgramadoVM() {
  // Hook genérico para manejar el estado (reutilizable para cualquier entidad)
  const estado = useEstadoPaginacion(PARAMETROS_INICIALES);
  
  // Hook específico de consulta para JobProgramado
  const paginacionQuery = usePaginacionJob(estado.parametros);

  
  const filtrarPorNombre = useCallback((nombre: string) => {
    estado.actualizarFiltros({ nombre });
  }, [estado.actualizarFiltros]);

  const filtrarPorMetodoHttp = useCallback((metodoHttps: number | undefined) => {
    estado.actualizarFiltros({ metodoHttps });
  }, [estado.actualizarFiltros]);

  const filtrarPorEstadoEjecucion = useCallback((estadoEjecucion: number | undefined) => {
    estado.actualizarFiltros({ estadoEjecucion });
  }, [estado.actualizarFiltros]);

  return {
    ...paginacionQuery,
    
    ...estado,
  
    filtrarPorNombre,
    filtrarPorMetodoHttp,
    filtrarPorEstadoEjecucion,
  };
}