import {  RespuestaPaginada, Metodo, PaginacionMetodoQuery } from "../../Dominio/Model";
import { ApiSinAuth } from "../configuracion/Axio/Api";
import { IJobMetodoImplementacion } from "../Interfaz/IJobMetodoImplementacion";
import { Utilitarios } from "../Utilitario";


export class JobMetodoImplementacion implements IJobMetodoImplementacion {
    async ObtenerPaginacion(request: PaginacionMetodoQuery): Promise<RespuestaPaginada<Metodo>> {
        try {
            const url = "/api/v1/Metodos/paginacion";
            const queryParams = Utilitarios.ConstruirQueryParams(request);
            const urlConParametros = `${url}?${queryParams.toString()}`;
            
            const respuesta = await ApiSinAuth.get<RespuestaPaginada<Metodo>>(urlConParametros);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<RespuestaPaginada<Metodo>>(error);
        }
    }   
}