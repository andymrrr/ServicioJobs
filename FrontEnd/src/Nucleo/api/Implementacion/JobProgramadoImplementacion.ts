import { JobProgramado, Respuesta, RespuestaPaginada } from "../../Model";
import { IJobProgramadoImplementacion } from "../Interfaz/IJobProgramadoImplementacion";

export class JobProgramadoImplementacion implements IJobProgramadoImplementacion {
    ObtenerPaginacion(request: FormData): Promise<RespuestaPaginada<JobProgramado>> {
        throw new Error("Method not implemented.");
    }
    CrearJobProgramado(request: FormData): Promise<Respuesta> {
        throw new Error("Method not implemented.");
    }
    ObtenerJobPorId(id: number): Promise<Respuesta> {
        throw new Error("Method not implemented.");
    }
    ActualizarJobProgramado(request: FormData): Promise<Respuesta> {
        throw new Error("Method not implemented.");
    }
}