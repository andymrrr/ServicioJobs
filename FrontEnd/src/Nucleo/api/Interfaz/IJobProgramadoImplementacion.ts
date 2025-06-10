import { JobProgramado, Respuesta, RespuestaPaginada } from "../../Model"

export interface IJobProgramadoImplementacion{
    CrearJobProgramado( request: FormData): Promise<Respuesta>
    ObtenerJobPorId(id: number): Promise<Respuesta>
    ActualizarJobProgramado(request: FormData): Promise<Respuesta>
    ObtenerPaginacion(request: FormData): Promise<RespuestaPaginada<JobProgramado>>
}