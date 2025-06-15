import { JobProgramado, Respuesta, RespuestaPaginada, PaginacionProgramadosQuery } from "../../Dominio/Model"

export interface IJobProgramadoImplementacion{
    CrearJobProgramado( request: FormData): Promise<Respuesta>
    ObtenerJobPorId(id: number): Promise<Respuesta>
    ActualizarJobProgramado(request: FormData): Promise<Respuesta>
    ObtenerPaginacion(request: PaginacionProgramadosQuery): Promise<RespuestaPaginada<JobProgramado>>
    CrearJobProgramadoConJSON(request: any): Promise<any>
}