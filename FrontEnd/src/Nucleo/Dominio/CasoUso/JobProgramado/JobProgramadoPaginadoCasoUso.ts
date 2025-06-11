import { JobProgramadoImplementacion } from "../../../api/Implementacion/JobProgramadoImplementacion";
import { JobProgramado, RespuestaPaginada } from "../../Model";
import { PaginacionProgramadosQuery } from "../../Model/JobProgramado/PaginacionProgramadosQuery";

const { ObtenerPaginacion } = new JobProgramadoImplementacion();

export const JobProgramadoPaginadoCasoUso = async (
  request: PaginacionProgramadosQuery
): Promise<RespuestaPaginada<JobProgramado>> => {
  
  // Validaciones de negocio
  if (request.pagina && request.pagina < 1) {
    throw new Error("La página debe ser mayor a 0");
  }
  
  if (request.cantidadRegistroPorPagina && (request.cantidadRegistroPorPagina < 1 || request.cantidadRegistroPorPagina > 100)) {
    throw new Error("La cantidad de registros por página debe estar entre 1 y 100");
  }

  // Preparar parámetros con valores por defecto y lógica de negocio
  const parametrosPreparados: PaginacionProgramadosQuery = {
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

  // Validar y asignar método HTTP
  if (request.metodoHttps !== undefined && request.metodoHttps !== null) {
    if (request.metodoHttps >= 1 && request.metodoHttps <= 5) {
      parametrosPreparados.metodoHttps = request.metodoHttps;
    } else {
      throw new Error("El método HTTP debe estar entre 1 y 5");
    }
  }

  // Validar y asignar estado de ejecución
  if (request.estadoEjecucion !== undefined && request.estadoEjecucion !== null) {
    if (request.estadoEjecucion >= 1 && request.estadoEjecucion <= 4) {
      parametrosPreparados.estadoEjecucion = request.estadoEjecucion;
    } else {
      throw new Error("El estado de ejecución debe estar entre 1 y 4");
    }
  }

  // Llamar directamente a la implementación con el objeto preparado
  const resultado = await ObtenerPaginacion(parametrosPreparados);

  // Validaciones adicionales del resultado si es necesario
  if (!resultado) {
    throw new Error("No se recibió respuesta del servidor");
  }

  return resultado;
};
