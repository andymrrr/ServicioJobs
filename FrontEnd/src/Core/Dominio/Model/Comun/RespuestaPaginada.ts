export interface RespuestaPaginada<T> {
    totalRegistros: number;
    paginaActual: number;
    cantidadRegistroPorPagina: number;
    datos?: T[];
    totalPaginas: number;
  }
  