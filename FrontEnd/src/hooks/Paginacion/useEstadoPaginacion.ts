import { useState, useCallback } from 'react';
import { PaginacionQuery } from "../../Core/Dominio/Model/Comun/PaginacionQuery";

export function useEstadoPaginacion<TQuery extends PaginacionQuery>(
  parametrosIniciales: TQuery
) {
  const [parametros, setParametros] = useState<TQuery>(parametrosIniciales);

  const actualizarFiltros = useCallback((nuevosParametros: Partial<TQuery>) => {
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
      ...(cantidadPorPagina && { cantidadRegistroPorPagina: cantidadPorPagina })
    }));
  }, []);

  const limpiarFiltros = useCallback(() => {
    setParametros(parametrosIniciales);
  }, [parametrosIniciales]);

  const buscar = useCallback((busqueda: string) => {
    actualizarFiltros({ busqueda } as Partial<TQuery>);
  }, [actualizarFiltros]);

  return {
    parametros,
    actualizarFiltros,
    cambiarPagina,
    limpiarFiltros,
    buscar,
  };
} 