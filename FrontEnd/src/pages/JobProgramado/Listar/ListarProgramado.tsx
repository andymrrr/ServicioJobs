import React from 'react';
import { Button, Space, Alert } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import TablaPaginada from "../../../components/Tables/TablaPaginada";
import { Contenedor } from "../../../components/UI/Contenedor";
import Tarjeta from "../../../components/UI/Tarjeta";
import { useListarProgramadoVM } from "./ListarProgramado.vm";
import FiltrosProgramados from './components/FiltrosProgramados';
import { crearColumnasProgramados } from './components/ColumnasProgramados';
import { JobProgramado } from '../../../Nucleo/Dominio/Model';

export const PaginaListarProgramado = () => {
  const {
    // Datos de la tabla
    cantidadRegistroPorPagina,
    paginaActual,
    totalPaginas,
    totalRegistros,
    datos,
    isLoading,
    isError,
    error,
    refetch,
    parametros,
    
    cambiarPagina,
    limpiarFiltros,
    buscar,
    filtrarPorNombre,
    filtrarPorMetodoHttp,
    filtrarPorEstadoEjecucion,
    actualizarFiltros,
  } = useListarProgramadoVM();

  // Handlers para las acciones de la tabla
  const handleEditar = (job: JobProgramado) => {
    console.log('Editar job:', job);
    // TODO: Implementar navegación a formulario de edición
  };

  const handleEliminar = (job: JobProgramado) => {
    console.log('Eliminar job:', job);
    // TODO: Implementar confirmación y eliminación
  };

  const handleEjecutar = (job: JobProgramado) => {
    console.log('Ejecutar job:', job);
    // TODO: Implementar ejecución manual del job
  };


  // Configuración de columnas de la tabla
  const columnas = crearColumnasProgramados({
    onEditar: handleEditar,
    onEliminar: handleEliminar,
    onEjecutar: handleEjecutar,
  });

  // Handler para búsqueda inmediata (al presionar Enter o botón)
  const handleBuscarInmediato = () => {
    
    refetch();
  };

  return (
    <Contenedor>
      <Tarjeta
        titulo="Jobs Programados"
        subtitulo="Gestión y monitoreo de tareas programadas"
        lineaHeader={{ mostrar: true, color: "blue", grosor: "1px" }}
       
      >
        {/* Filtros de búsqueda */}
        <FiltrosProgramados
          busqueda={parametros.busqueda || ''}
          nombre={parametros.nombre || ''}
          metodoHttps={parametros.metodoHttps}
          estadoEjecucion={parametros.estadoEjecucion}
          onBusquedaChange={(valor) => actualizarFiltros({ busqueda: valor })}
          onNombreChange={(valor) => actualizarFiltros({ nombre: valor })}
          onMetodoHttpChange={filtrarPorMetodoHttp}
          onEstadoEjecucionChange={filtrarPorEstadoEjecucion}
          onLimpiarFiltros={limpiarFiltros}
          onBuscar={handleBuscarInmediato}
        />

        {/* Mostrar errores si los hay */}
        {isError && (
          <Alert
            message="Error al cargar los datos"
            description={error?.message || 'Ha ocurrido un error inesperado'}
            type="error"
            showIcon
            className="mb-4"
            action={
              <Button size="small" onClick={() => refetch()}>
                Reintentar
              </Button>
            }
          />
        )}

        {/* Información de resultados */}
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Mostrando {datos.length} de {totalRegistros} registros
          </span>
          {isLoading && (
            <span className="text-sm text-blue-600">
              Cargando...
            </span>
          )}
        </div>

        {/* Tabla con paginación */}
        <TablaPaginada
          datos={datos}
          columnas={columnas}
          total={totalRegistros}
          paginaActual={paginaActual}
          tamanioPagina={cantidadRegistroPorPagina}
          onPageChange={cambiarPagina}
          claveFila="idProgramado"
          opcionesTamanioPagina={['10', '25', '50', '100']}
        />
      </Tarjeta>
    </Contenedor>
  );
};
  