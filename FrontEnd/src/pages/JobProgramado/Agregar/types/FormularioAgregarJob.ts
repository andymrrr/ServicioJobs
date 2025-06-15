import { FormularioTabData } from "../../../../components/FormulariosControles/HookFormDinamico";

export interface FormularioAgregarJob {
    nombre: string;
    descripcion: string;
    url: string;
    crontab: string;
    correoNotificar: string;
    reintentosPermitidos?: number;
    periodoReintento?: number;
    timeout?: number;
    metodoHttp: string;
    configuracionAPI: FormularioTabData;
} 