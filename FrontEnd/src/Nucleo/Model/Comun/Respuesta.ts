export interface Respuesta<T = any> {
    datos?: T;
    completado: boolean;
    mensaje: string;
    errorTecnico: string | null;
    errores: string | null;
    tipoError: string | null;
  }
  