export interface IJobProgramadoImplementacion{
    CrearJobProgramado( request: FormData): Promise<boolean>
    ObtenerJobPorId(id: number): Promise<boolean>
    ActualizarJobProgramado(request: FormData): Promise<boolean>
    ObtenerPaginacion(request: FormData): Promise<Boolean>
}