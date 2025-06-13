import { PaginacionQuery } from "../Comun/PaginacionQuery";

export interface PaginacionProgramadosQuery extends PaginacionQuery {
  metodoHttps?: number;
  idMetodo?: string; 
  estadoEjecucion?: number;
  nombre?: string;
  // Nota: cantidadPorPagina viene de PaginacionQuery base
} 