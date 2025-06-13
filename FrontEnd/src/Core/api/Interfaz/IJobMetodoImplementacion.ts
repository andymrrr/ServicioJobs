import { Metodo, PaginacionMetodoQuery, RespuestaPaginada } from "../../Dominio/Model"

export interface IJobMetodoImplementacion{
    ObtenerPaginacion(request: PaginacionMetodoQuery): Promise<RespuestaPaginada<Metodo>>
}