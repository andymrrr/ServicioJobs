import { JobProgramadoImplementacion } from "../../../api/Implementacion/JobProgramadoImplementacion";
import { Utilitarios } from "../../../api/Utilitario";
import { Respuesta } from "../../Model";
import { AgregarJobProgramadoComand } from "../../Model/JobProgramado/AgregarJobProgramadoComand";

const {CrearJobProgramado} = new JobProgramadoImplementacion()
export const CrearJobProgramadoCasoUso = async (request: AgregarJobProgramadoComand) : Promise<Respuesta>=> {
  const comando = Utilitarios.construirFormularioAutomatico(request);
  const resultado = await CrearJobProgramado(comando);

  return resultado;
}
