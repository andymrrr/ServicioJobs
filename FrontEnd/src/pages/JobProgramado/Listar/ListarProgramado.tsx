import { Button, Alert } from 'antd';
import TablaPaginada from "../../../components/Tables/TablaPaginada";
import { Contenedor } from "../../../components/UI/Contenedor";
import Tarjeta from "../../../components/UI/Tarjeta";
import FiltrosProgramados from './components/FiltrosProgramados';
import { crearColumnasProgramados } from './components/ColumnasProgramados';
import { crearBotonesProgramados } from './components/BotonesProgramados';
import { usePaginacionProgramadoVM } from './PaginacionProgramado.vm';
import { useListarProgramadoVM } from './ListarProgramado.Vm';

export const PaginaListarProgramado = () => {
  const vm = usePaginacionProgramadoVM();
  const { handleEditar, handleEliminar, handleEjecutar } = useListarProgramadoVM();
 

  const columnas = crearColumnasProgramados({
    onEditar: handleEditar,
    onEliminar: handleEliminar,
    onEjecutar: handleEjecutar,
  });

  const botonesTabla = crearBotonesProgramados({
    onRefrescar: () => vm.refetch(),
    cargandoRefresh: vm.isLoading,
    urlCrear: "/JobProgramado/Agregar",
    mostrarAgregar: true,
    mostrarRefrescar: true,
  });

  return (
    <Contenedor>
      <Tarjeta
        titulo="Jobs Programados"
        subtitulo="Gestión y monitoreo de tareas programadas"
        lineaHeader={{ mostrar: true, color: "blue", grosor: "1px" }}
      >
        <FiltrosProgramados
          busqueda={vm.parametros.busqueda || ''}
          nombre={vm.parametros.nombre || ''}
          metodoHttps={vm.parametros.metodoHttps}
          estadoEjecucion={vm.parametros.estadoEjecucion}
          onBusquedaChange={(valor) => vm.actualizarFiltros({ busqueda: valor })}
          onNombreChange={(valor) => vm.actualizarFiltros({ nombre: valor })}
          onMetodoHttpChange={(metodoHttps) => vm.actualizarFiltros({ metodoHttps })}
          onEstadoEjecucionChange={(estadoEjecucion) => vm.actualizarFiltros({ estadoEjecucion })}
          onLimpiarFiltros={vm.limpiarFiltros}
          onBuscar={vm.refetch}
        />

        {vm.isError && (
          <Alert
            message="Error al cargar los datos"
            description={vm.error?.message || 'Ha ocurrido un error inesperado'}
            type="error"
            showIcon
            className="mb-4"
            action={
              <Button size="small" onClick={() => vm.refetch()}>
                Reintentar
              </Button>
            }
          />
        )}
        <TablaPaginada
          datos={vm.datos}
          columnas={columnas}
          total={vm.totalRegistros}
          paginaActual={vm.paginaActual}
          tamanioPagina={vm.cantidadRegistroPorPagina}
          onPageChange={vm.cambiarPagina}
          claveFila="idProgramado"
          opcionesTamanioPagina={['10', '25', '50', '100']}
          botones={botonesTabla}
          espaciadoBotones="middle"
          clasesPersonalizadas={{
            contenedor: 'border-0',
            header: 'border-b border-gray-200 pb-3',
            footer: 'border-t border-gray-200 pt-3'
          }}
        />
      </Tarjeta>
    </Contenedor>
  );
};
  