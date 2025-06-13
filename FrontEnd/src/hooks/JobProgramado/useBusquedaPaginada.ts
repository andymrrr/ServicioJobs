import { useQuery } from "@tanstack/react-query";
import { JobProgramado, RespuestaPaginada, PaginacionProgramadosQuery } from "../../Core/Dominio/Model";
import { JobProgramadoPaginadoCasoUso } from "../../Core/Dominio/CasoUso";

export interface ParametrosBusquedaPaginada {
  pagina?: number;
  cantidadPorPagina?: number;
  busqueda?: string;
  ordenar?: string;
  metodoHttps?: number;
  idMetodo?: string;
  estadoEjecucion?: number;
  nombre?: string;
}

export const useBusquedaPaginada = (parametros: ParametrosBusquedaPaginada = {}) => {
  const {
    pagina = 1,
    cantidadPorPagina = 10,
    busqueda,
    ordenar,
    metodoHttps,
    idMetodo,
    estadoEjecucion,
    nombre
  } = parametros;

  const query = useQuery<RespuestaPaginada<JobProgramado>, Error>({
    queryKey: ['jobsProgramados', pagina, cantidadPorPagina, busqueda, ordenar, metodoHttps, idMetodo, estadoEjecucion, nombre],
    queryFn: async () => {
      // Preparar la consulta - solo estructurar los datos, sin lógica de negocio
      const consulta: PaginacionProgramadosQuery = {
        pagina,
        cantidadRegistroPorPagina: cantidadPorPagina,
        busqueda,
        ordenar,
        metodoHttps,
        idMetodo,
        estadoEjecucion,
        nombre
      };
      return await JobProgramadoPaginadoCasoUso(consulta);
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });

  return {
    
    datos: query.data?.datos || [],
    totalRegistros: query.data?.totalRegistros || 0,
    paginaActual: query.data?.paginaActual || 1,
    cantidadRegistroPorPagina: query.data?.cantidadRegistroPorPagina || 10,
    totalPaginas: query.data?.totalPaginas || 0,
    
   
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    isSuccess: query.isSuccess,
    
   
    error: query.error,
    refetch: query.refetch,
    
    tienePaginaAnterior: pagina > 1,
    tienePaginaSiguiente: pagina < (query.data?.totalPaginas || 0),
    paginaAnterior: pagina > 1 ? pagina - 1 : null,
    paginaSiguiente: pagina < (query.data?.totalPaginas || 0) ? pagina + 1 : null,
  };
}; 