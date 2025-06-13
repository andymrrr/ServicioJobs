import { MetodoHttp } from "../../../Core/Dominio/Model/enum/MethodoHTTP";
import { VALIDACIONES, crearValidacionesDominio } from "../../../utils/validaciones";


export const CONFIGURACION_JOB = {
    // Límites y restricciones específicas del job
    MAXIMA_CAMPOS_API: 20,
    TIMEOUT_DEFECTO: 300,
    REINTENTOS_DEFECTO: 3,
    PERIODO_REINTENTO_DEFECTO: 5,

    // Placeholders específicos del job
    PLACEHOLDERS: {
        NOMBRE: "Ej: Sincronizar usuarios diariamente",
        ID_METODO: "Ej: SYNC_USERS",
        URL: "https://api.ejemplo.com/v1/usuarios",
        DESCRIPCION: "Describe qué hace este job y cuándo se ejecuta",
        CRON: "0 0 * * * (Diario a medianoche)",
        EMAIL: "admin@empresa.com",
        TIMEOUT: "300",
        REINTENTOS: "3",
        PERIODO_REINTENTO: "5"
    },

    // Tooltips específicos del job
    TOOLTIPS: {
        CRON: "Formato: minuto hora día mes día-semana"
    }
};

/**
 * Opciones para el selector de método HTTP específicas del job
 */
export const OPCIONES_METODO_HTTP = [
    { value: MetodoHttp.GET.toString(), label: "GET" },
    { value: MetodoHttp.POST.toString(), label: "POST" },
    { value: MetodoHttp.PUT.toString(), label: "PUT" },
    { value: MetodoHttp.DELETE.toString(), label: "DELETE" }
];
export const REGLAS_VALIDACION_JOB = crearValidacionesDominio({
    NOMBRE: VALIDACIONES.texto(3, 100),
    ID_METODO: VALIDACIONES.codigoMayuscula(),
    URL: VALIDACIONES.url(),
    DESCRIPCION: VALIDACIONES.texto(10, 500),
    CRON: VALIDACIONES.cron(),
    EMAIL: VALIDACIONES.email(),
    
    // Campos opcionales para configuración avanzada
    TIMEOUT: VALIDACIONES.numeroRango(1, 3600, false),
    REINTENTOS: VALIDACIONES.numeroRango(0, 10, false),
    PERIODO_REINTENTO: VALIDACIONES.numeroRango(1, 1440, false)
}); 