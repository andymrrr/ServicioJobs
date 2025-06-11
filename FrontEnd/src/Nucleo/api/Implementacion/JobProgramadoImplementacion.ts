import { JobProgramado, Respuesta, RespuestaPaginada, PaginacionProgramadosQuery } from "../../Dominio/Model";
import { ApiSinAuth } from "../configuracion/Api";
import { IJobProgramadoImplementacion } from "../Interfaz/IJobProgramadoImplementacion";
import { Utilitarios } from "../Utilitario";

export class JobProgramadoImplementacion implements IJobProgramadoImplementacion {
    async ObtenerPaginacion(request: PaginacionProgramadosQuery): Promise<RespuestaPaginada<JobProgramado>> {
        try {
            const url = "/api/v1/Programados/paginacion";
            const queryParams = Utilitarios.ConstruirQueryParams(request);
            const urlConParametros = `${url}?${queryParams.toString()}`;
            
            const respuesta = await ApiSinAuth.get<RespuestaPaginada<JobProgramado>>(urlConParametros);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<RespuestaPaginada<JobProgramado>>(error);
        }
    }
   async CrearJobProgramado(request: FormData): Promise<Respuesta> {
        try {
            const url ="/api/v1/Programados/crearjob";
            const respuesta = await ApiSinAuth.post<Respuesta<JobProgramado>>(url, request);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<Respuesta<JobProgramado>>(error);
        }
    }
    async ObtenerJobPorId(id: number): Promise<Respuesta> {
        try {
            const url ="/binance/binary-momentum-catboost/entrenar";
            const respuesta = await ApiSinAuth.post<Respuesta<JobProgramado>>(url,id);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<Respuesta<JobProgramado>>(error);
        }
    }
    async ActualizarJobProgramado(request: FormData): Promise<Respuesta> {
        try {
            const url ="/binance/binary-momentum-catboost/entrenar";
            const respuesta = await ApiSinAuth.post<Respuesta<JobProgramado>>(url, request);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<Respuesta<JobProgramado>>(error);
        }
    }
}