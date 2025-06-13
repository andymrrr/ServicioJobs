import { JobMetodoImplementacion } from "../../../api/Implementacion/JobMetodoImplementacion";
import { Metodo, PaginacionMetodoQuery, RespuestaPaginada } from "../../Model";

const { ObtenerPaginacion } = new JobMetodoImplementacion();

export const JobProgramadoPaginadoCasoUso = async (
  request: PaginacionMetodoQuery
): Promise<RespuestaPaginada<Metodo>> => {
  
  // Validaciones de negocio
  if (request.pagina && request.pagina < 1) {
    throw new Error("La página debe ser mayor a 0");
  }
  
  if (request.cantidadRegistroPorPagina && (request.cantidadRegistroPorPagina < 1 || request.cantidadRegistroPorPagina > 100)) {
    throw new Error("La cantidad de registros por página debe estar entre 1 y 100");
  }

  // Preparar parámetros con valores por defecto y lógica de negocio
  const parametrosPreparados: PaginacionMetodoQuery = {
    pagina: request.pagina || 1,
    cantidadRegistroPorPagina: request.cantidadRegistroPorPagina || 10,
  };

  // Solo agregar parámetros opcionales si tienen valor válido
  if (request.busqueda && request.busqueda.trim().length > 0) {
    parametrosPreparados.busqueda = request.busqueda.trim();
  }

  if (request.nombre && request.nombre.trim().length > 0) {
    parametrosPreparados.nombre = request.nombre.trim();
  }

  if (request.ordenar && request.ordenar.trim().length > 0) {
    parametrosPreparados.ordenar = request.ordenar.trim();
  }

  if (request.idMetodo && request.idMetodo.trim().length > 0) {
    parametrosPreparados.idMetodo = request.idMetodo.trim();
  }

  

  const resultado = await ObtenerPaginacion(parametrosPreparados);

  if (!resultado) {
    throw new Error("No se recibió respuesta del servidor");
  }

  return resultado;
};
