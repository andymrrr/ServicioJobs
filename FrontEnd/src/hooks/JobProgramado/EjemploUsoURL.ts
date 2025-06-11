// Ejemplo de cómo se construye la URL con query parameters
// Este archivo es solo para demostración

import { PaginacionProgramadosQuery } from "../../Nucleo/Dominio/Model";
import { Utilitarios } from "../../Nucleo/api/Utilitario";

// Ejemplo 1: Búsqueda básica
const ejemploBasico: PaginacionProgramadosQuery = {
  pagina: 1,
  cantidadRegistroPorPagina: 10,
};

const queryParamsBasico = Utilitarios.ConstruirQueryParams(ejemploBasico);
const urlBasica = `/api/v1/Programados/paginacion?${queryParamsBasico.toString()}`;
// Resultado: /api/v1/Programados/paginacion?pagina=1&cantidadRegistroPorPagina=10

// Ejemplo 2: Búsqueda con filtros
const ejemploConFiltros: PaginacionProgramadosQuery = {
  pagina: 2,
  cantidadRegistroPorPagina: 25,
  busqueda: "monitoreo",
  nombre: "API Check",
  metodoHttps: 1, // GET
  estadoEjecucion: 3, // Completado
  ordenar: "nombre"
};

const queryParamsConFiltros = Utilitarios.ConstruirQueryParams(ejemploConFiltros);
const urlConFiltros = `/api/v1/Programados/paginacion?${queryParamsConFiltros.toString()}`;
// Resultado: /api/v1/Programados/paginacion?pagina=2&cantidadRegistroPorPagina=25&busqueda=monitoreo&nombre=API%20Check&metodoHttps=1&estadoEjecucion=3&ordenar=nombre

// Ejemplo 3: Solo algunos parámetros (los undefined se omiten automáticamente)
const ejemploParcial: PaginacionProgramadosQuery = {
  pagina: 1,
  cantidadRegistroPorPagina: 10,
  busqueda: "test",
  // metodoHttps, estadoEjecucion, etc. son undefined y se omiten
};

const queryParamsParcial = Utilitarios.ConstruirQueryParams(ejemploParcial);
const urlParcial = `/api/v1/Programados/paginacion?${queryParamsParcial.toString()}`;
// Resultado: /api/v1/Programados/paginacion?pagina=1&cantidadRegistroPorPagina=10&busqueda=test

export { 
  urlBasica, 
  urlConFiltros, 
  urlParcial 
}; 