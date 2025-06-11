import { useState, useCallback } from 'react';
import { useBusquedaPaginada, ParametrosBusquedaPaginada } from "../../../hooks";

// Valores por defecto para los parámetros
const PARAMETROS_INICIALES: ParametrosBusquedaPaginada = {
  pagina: 1,
  cantidadPorPagina: 10,
  busqueda: '',
  nombre: '',
  ordenar: 'nombre',
};

export function usePaginacionProgramadoVM() {
  const [parametros, setParametros] = useState<ParametrosBusquedaPaginada>(PARAMETROS_INICIALES);
  const busquedaQuery = useBusquedaPaginada(parametros);

  const actualizarFiltros = useCallback((nuevosParametros: Partial<ParametrosBusquedaPaginada>) => {
    setParametros(prev => ({
      ...prev,
      ...nuevosParametros,
      pagina: nuevosParametros.pagina ?? 1,
    }));
  }, []);

  const cambiarPagina = useCallback((pagina: number, cantidadPorPagina?: number) => {
    setParametros(prev => ({
      ...prev,
      pagina,
      ...(cantidadPorPagina && { cantidadPorPagina })
    }));
  }, []);

  const limpiarFiltros = useCallback(() => {
    setParametros(PARAMETROS_INICIALES);
  }, []);

  return {
    ...busquedaQuery,
    parametros,
    actualizarFiltros,
    cambiarPagina,
    limpiarFiltros,    
    buscar: useCallback((busqueda: string) => actualizarFiltros({ busqueda }), [actualizarFiltros]),
    filtrarPorNombre: useCallback((nombre: string) => actualizarFiltros({ nombre }), [actualizarFiltros]),
    filtrarPorMetodoHttp: useCallback((metodoHttps: number | undefined) => actualizarFiltros({ metodoHttps }), [actualizarFiltros]),
    filtrarPorEstadoEjecucion: useCallback((estadoEjecucion: number | undefined) => actualizarFiltros({ estadoEjecucion }), [actualizarFiltros]),
  };
}