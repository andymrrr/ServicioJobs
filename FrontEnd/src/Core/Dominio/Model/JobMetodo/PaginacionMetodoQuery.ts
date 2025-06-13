import { PaginacionQuery } from "../Comun/PaginacionQuery";

export interface PaginacionMetodoQuery extends PaginacionQuery {
    metodoHttps?: string;
    idMetodo?: string;
    nombre?: string;
}