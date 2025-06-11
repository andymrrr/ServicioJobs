import { useState } from 'react';
import { useBusquedaPaginada, ParametrosBusquedaPaginada } from "../../../hooks";

export function useListarProgramadoVM() {
  // Estados para filtros
  const [parametros, setParametros] = useState<ParametrosBusquedaPaginada>({
    pagina: 1,
    cantidadPorPagina: 10,
    busqueda: '',
    nombre: '',
    ordenar: 'nombre',
  });

  // Hook de datos
  const { 
    cantidadRegistroPorPagina, 
    paginaActual, 
    totalPaginas,
    totalRegistros, 
    datos, 
    isLoading, 
    isError, 
    isSuccess, 
    error, 
    refetch,
    tienePaginaAnterior,
    tienePaginaSiguiente
  } = useBusquedaPaginada(parametros);

  // Funciones para actualizar filtros
  const actualizarFiltros = (nuevosParametros: Partial<ParametrosBusquedaPaginada>) => {
    setParametros(prev => ({
      ...prev,
      ...nuevosParametros,
      pagina: nuevosParametros.pagina ?? 1, // Resetear a página 1 cuando se cambian filtros
    }));
  };

  const cambiarPagina = (pagina: number, cantidadPorPagina: number) => {
    setParametros(prev => ({
      ...prev,
      pagina,
      cantidadPorPagina
    }));
  };

  const limpiarFiltros = () => {
    setParametros({
      pagina: 1,
      cantidadPorPagina: 10,
      busqueda: '',
      nombre: '',
      ordenar: 'nombre',
    });
  };

  const buscar = (textoBusqueda: string) => {
    actualizarFiltros({
      busqueda: textoBusqueda,
      pagina: 1
    });
  };

  const filtrarPorNombre = (nombre: string) => {
    actualizarFiltros({
      nombre,
      pagina: 1
    });
  };

  const filtrarPorMetodoHttp = (metodoHttps: number | undefined) => {
    actualizarFiltros({
      metodoHttps,
      pagina: 1
    });
  };

  const filtrarPorEstadoEjecucion = (estadoEjecucion: number | undefined) => {
    actualizarFiltros({
      estadoEjecucion,
      pagina: 1
    });
  };

  return {
    // Datos de la tabla
    cantidadRegistroPorPagina,
    paginaActual,
    totalPaginas,
    totalRegistros,
    datos,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
    tienePaginaAnterior,
    tienePaginaSiguiente,
    
    // Parámetros actuales
    parametros,
    
    // Funciones de control
    cambiarPagina,
    limpiarFiltros,
    buscar,
    filtrarPorNombre,
    filtrarPorMetodoHttp,
    filtrarPorEstadoEjecucion,
    actualizarFiltros,
  };
}