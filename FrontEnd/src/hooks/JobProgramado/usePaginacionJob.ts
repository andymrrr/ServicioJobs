import { useQuery } from '@tanstack/react-query';
import { JobProgramado, PaginacionProgramadosQuery, RespuestaPaginada } from '../../Core/Dominio/Model';
import { JobProgramadoPaginadoCasoUso } from '../../Core/Dominio/CasoUso';

export const usePaginacionJob = (params: PaginacionProgramadosQuery) => {
  const query = useQuery<RespuestaPaginada<JobProgramado>, Error>({
    queryKey: ['jobsPaginados', params], 
    queryFn: () => JobProgramadoPaginadoCasoUso(params),
    placeholderData: (previousData) => previousData, 
    staleTime: 5 * 60 * 1000, 
  });

  const { 
    pagina = 1, 
    cantidadRegistroPorPagina = 10 
  } = params;

  return {
   
    datos: query.data?.datos || [],
    totalRegistros: query.data?.totalRegistros || 0,
    paginaActual: query.data?.paginaActual || pagina,
    cantidadRegistroPorPagina: query.data?.cantidadRegistroPorPagina || cantidadRegistroPorPagina,
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
    
    
    primerRegistro: query.data?.totalRegistros ? ((pagina - 1) * cantidadRegistroPorPagina) + 1 : 0,
    ultimoRegistro: Math.min(pagina * cantidadRegistroPorPagina, query.data?.totalRegistros || 0),
    
    
    rangoActual: `${((pagina - 1) * cantidadRegistroPorPagina) + 1}-${Math.min(pagina * cantidadRegistroPorPagina, query.data?.totalRegistros || 0)}`,
    textoResumen: `${((pagina - 1) * cantidadRegistroPorPagina) + 1}-${Math.min(pagina * cantidadRegistroPorPagina, query.data?.totalRegistros || 0)} de ${query.data?.totalRegistros || 0} registros`,
  };
};