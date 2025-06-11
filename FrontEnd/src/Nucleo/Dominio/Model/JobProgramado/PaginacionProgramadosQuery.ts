export interface PaginacionProgramadosQuery {
  pagina?: number;
  cantidadRegistroPorPagina?: number;
  busqueda?: string;
  ordenar?: string;
  metodoHttps?: number; // Enum en backend: 0=GET, 1=POST, 2=PUT, 3=DELETE, 4=PATCH
  idMetodo?: string; // Guid en string format
  estadoEjecucion?: number;
  nombre?: string;
} 