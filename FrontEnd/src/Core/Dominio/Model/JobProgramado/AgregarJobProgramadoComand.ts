import { MetodoHttp } from "../enum/MethodoHTTP";
import { JobParametro } from "./JobParametro";

export interface AgregarJobProgramadoComand {
    idMetodo: string;
    nombre: string;
    descripcion: string;
    url: string;
    jobParametro: JobParametro[];
    crontab: string;
    correoNotificar: string;
    reintentosPermitidos?: number;
    periodoReintento?: number;
    timeout?: number;
    metodoHttp: MetodoHttp;
  }
  