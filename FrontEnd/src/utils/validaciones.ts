/**
 * Reglas de validación genéricas para formularios
 * Centralizadas para reutilización en toda la aplicación
 */

export interface ReglasValidacion {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    min?: { value: number; message: string };
    max?: { value: number; message: string };
    validate?: Record<string, (value: any) => boolean | string>;
}


export const PATRONES_REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    URL: /^https?:\/\/.+/,
    SOLO_LETRAS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    SOLO_NUMEROS: /^\d+$/,
    ALPHANUMERICO: /^[a-zA-Z0-9]+$/,
    TELEFONO: /^[+]?[\d\s\-()]+$/,
    CODIGO_MAYUSCULA: /^[A-Z_][A-Z0-9_]*$/,
    CRON: /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/,
    JSON: /^[\],:{}\s]*$/,
    IPV4: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
    PASSWORD_FUERTE: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};


export const MENSAJES_ERROR = {
    REQUERIDO: "Este campo es requerido",
    EMAIL_INVALIDO: "Formato de email inválido",
    URL_INVALIDA: "La URL debe comenzar con http:// o https://",
    TELEFONO_INVALIDO: "Formato de teléfono inválido",
    SOLO_LETRAS: "Solo se permiten letras",
    SOLO_NUMEROS: "Solo se permiten números",
    CODIGO_INVALIDO: "Solo mayúsculas, números y guiones bajos. Debe comenzar con letra o guión bajo",
    CRON_INVALIDO: "Formato de cron inválido",
    JSON_INVALIDO: "Formato JSON inválido",
    IP_INVALIDA: "Formato de IP inválido",
    PASSWORD_DEBIL: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
    
    
    MIN_CARACTERES: (min: number) => `Mínimo ${min} caracteres`,
    MAX_CARACTERES: (max: number) => `Máximo ${max} caracteres`,
    MIN_VALOR: (min: number) => `El valor mínimo es ${min}`,
    MAX_VALOR: (max: number) => `El valor máximo es ${max}`,
    LONGITUD_EXACTA: (longitud: number) => `Debe tener exactamente ${longitud} caracteres`
};


export const VALIDACIONES = {

    requerido: (mensaje?: string): ReglasValidacion => ({
        required: mensaje || MENSAJES_ERROR.REQUERIDO
    }),
    email: (mensaje?: string): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.EMAIL,
            message: mensaje || MENSAJES_ERROR.EMAIL_INVALIDO
        }
    }),
    url: (mensaje?: string): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.URL,
            message: mensaje || MENSAJES_ERROR.URL_INVALIDA
        }
    }),
    texto: (min: number, max: number, requerido = true): ReglasValidacion => ({
        ...(requerido && { required: MENSAJES_ERROR.REQUERIDO }),
        minLength: { value: min, message: MENSAJES_ERROR.MIN_CARACTERES(min) },
        maxLength: { value: max, message: MENSAJES_ERROR.MAX_CARACTERES(max) }
    }),

    soloTexto: (min?: number, max?: number): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.SOLO_LETRAS,
            message: MENSAJES_ERROR.SOLO_LETRAS
        },
        ...(min && { minLength: { value: min, message: MENSAJES_ERROR.MIN_CARACTERES(min) } }),
        ...(max && { maxLength: { value: max, message: MENSAJES_ERROR.MAX_CARACTERES(max) } })
    }),

    soloNumeros: (min?: number, max?: number): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.SOLO_NUMEROS,
            message: MENSAJES_ERROR.SOLO_NUMEROS
        },
        ...(min !== undefined && { min: { value: min, message: MENSAJES_ERROR.MIN_VALOR(min) } }),
        ...(max !== undefined && { max: { value: max, message: MENSAJES_ERROR.MAX_VALOR(max) } })
    }),


    codigoMayuscula: (mensaje?: string): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.CODIGO_MAYUSCULA,
            message: mensaje || MENSAJES_ERROR.CODIGO_INVALIDO
        }
    }),

    cron: (mensaje?: string): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.CRON,
            message: mensaje || MENSAJES_ERROR.CRON_INVALIDO
        }
    }),


    telefono: (mensaje?: string): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.TELEFONO,
            message: mensaje || MENSAJES_ERROR.TELEFONO_INVALIDO
        }
    }),


    numeroRango: (min: number, max: number, requerido = true): ReglasValidacion => ({
        ...(requerido && { required: MENSAJES_ERROR.REQUERIDO }),
        min: { value: min, message: MENSAJES_ERROR.MIN_VALOR(min) },
        max: { value: max, message: MENSAJES_ERROR.MAX_VALOR(max) }
    }),


    passwordFuerte: (mensaje?: string): ReglasValidacion => ({
        required: MENSAJES_ERROR.REQUERIDO,
        pattern: {
            value: PATRONES_REGEX.PASSWORD_FUERTE,
            message: mensaje || MENSAJES_ERROR.PASSWORD_DEBIL
        }
    }),


    opcional: (): ReglasValidacion => ({}),


    personalizada: (validador: (value: any) => boolean | string, mensaje: string): ReglasValidacion => ({
        validate: {
            custom: (value: any) => validador(value) || mensaje
        }
    })
};


export const VALIDACIONES_FORMULARIOS = {

    NOMBRE_USUARIO: VALIDACIONES.texto(2, 50),
    EMAIL_USUARIO: VALIDACIONES.email(),
    PASSWORD: VALIDACIONES.passwordFuerte(),
    TELEFONO: VALIDACIONES.telefono(),


    NOMBRE_GENERICO: VALIDACIONES.texto(3, 100),
    DESCRIPCION_CORTA: VALIDACIONES.texto(10, 200),
    DESCRIPCION_LARGA: VALIDACIONES.texto(10, 500),
    CODIGO_IDENTIFICADOR: VALIDACIONES.codigoMayuscula(),
    URL_API: VALIDACIONES.url(),
    EXPRESION_CRON: VALIDACIONES.cron(),
    TIMEOUT: VALIDACIONES.numeroRango(1, 3600, false),
    REINTENTOS: VALIDACIONES.numeroRango(0, 10, false),
    PERIODO_MINUTOS: VALIDACIONES.numeroRango(1, 1440, false),
    COMENTARIOS: VALIDACIONES.opcional(),
    NOTAS: VALIDACIONES.opcional()
};


export const combinarValidaciones = (...reglas: ReglasValidacion[]): ReglasValidacion => {
    return reglas.reduce((acc, regla) => ({
        ...acc,
        ...regla,
        validate: {
            ...acc.validate,
            ...regla.validate
        }
    }), {});
};


export const crearValidacionesDominio = (
    configuracion: Record<string, ReglasValidacion>
): Record<string, ReglasValidacion> => {
    return configuracion;
}; 