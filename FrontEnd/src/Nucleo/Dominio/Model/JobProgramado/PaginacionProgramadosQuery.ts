export interface PaginacionProgramadosQuery {
  pagina?: number;
  cantidadRegistroPorPagina?: number;
  busqueda?: string;
  ordenar?: string;
  metodoHttps?: number;
  idMetodo?: string;
  estadoEjecucion?: number;
  nombre?: string;
} 