import { FormularioTabData, CampoFormularioMejorado } from './types';


export interface ParClaveValor {
  nombre: string;
  valor: string;
}


export interface ConfiguracionAPIProcesada {
  headers: ParClaveValor[];
  queryParams: ParClaveValor[];
  body?: ParClaveValor[];
}


export const procesarConfiguracionAPI = (
  configuracionAPI: FormularioTabData,
  pestañasIncluidas?: string[]
): ConfiguracionAPIProcesada => {
  const resultado: ConfiguracionAPIProcesada = {
    headers: [],
    queryParams: [],
    body: []
  };

  // Si no se especifican pestañas, procesar todas
  const pestañasAProcesar = pestañasIncluidas || Object.keys(configuracionAPI);

  pestañasAProcesar.forEach(pestaña => {
    const campos = configuracionAPI[pestaña] || [];
    const paresClaveValor = procesarCamposAPares(campos);

    // Mapear pestañas a propiedades del resultado
    switch (pestaña.toLowerCase()) {
      case 'headers':
        resultado.headers = paresClaveValor;
        break;
      case 'query params':
      case 'queryparams':
        resultado.queryParams = paresClaveValor;
        break;
      case 'body':
        resultado.body = paresClaveValor;
        break;
      default:
        // Para pestañas personalizadas, agregar como propiedad dinámica
        (resultado as any)[pestaña] = paresClaveValor;
    }
  });

  return resultado;
};

export const procesarCamposAPares = (campos: CampoFormularioMejorado[]): ParClaveValor[] => {
  return campos
    .filter(campo => campo.nombre && campo.nombre.trim() !== '')
    .map(campo => ({
      nombre: campo.nombre.trim(),
      valor: campo.valor || ''
    }));
};


export const obtenerSoloClaves = (
  configuracionAPI: FormularioTabData,
  pestaña: string
): string[] => {
  const campos = configuracionAPI[pestaña] || [];
  return procesarCamposAPares(campos).map(par => par.nombre);
};


export const obtenerSoloValores = (
  configuracionAPI: FormularioTabData,
  pestaña: string
): string[] => {
  const campos = configuracionAPI[pestaña] || [];
  return procesarCamposAPares(campos).map(par => par.valor);
};

export const paresAObjeto = (pares: ParClaveValor[]): Record<string, string> => {
  return pares.reduce((obj, par) => {
    obj[par.nombre] = par.valor;
    return obj;
  }, {} as Record<string, string>);
};

export const validarConfiguracionAPI = (
  configuracionAPI: FormularioTabData,
  camposRequeridos: Record<string, string[]>
): Record<string, string[]> => {
  const errores: Record<string, string[]> = {};

  Object.entries(camposRequeridos).forEach(([pestaña, campos]) => {
    const camposActuales = obtenerSoloClaves(configuracionAPI, pestaña);
    const camposFaltantes = campos.filter(campo => !camposActuales.includes(campo));
    
    if (camposFaltantes.length > 0) {
      errores[pestaña] = camposFaltantes;
    }
  });

  return errores;
};

export const obtenerEstadisticasConfiguracion = (
  configuracionAPI: FormularioTabData
): Record<string, number> => {
  const estadisticas: Record<string, number> = {};

  Object.entries(configuracionAPI).forEach(([pestaña, campos]) => {
    estadisticas[pestaña] = procesarCamposAPares(campos).length;
  });

  estadisticas.total = Object.values(estadisticas).reduce((sum, count) => sum + count, 0);

  return estadisticas;
}; 