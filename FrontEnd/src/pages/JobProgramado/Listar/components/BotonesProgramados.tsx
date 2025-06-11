import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { ConfiguracionBotonTabla, PosicionBotonTabla } from "../../../../components/Tables/TablaPaginada";
import BotonRedirect from "../../../../components/UI/Botones/BotonRedirect";
import BotonPrimario from "../../../../components/UI/Botones/BotonPrimario";

interface AccionesBotonesProgramadosProps {
  onRefrescar: () => void;
  cargandoRefresh: boolean;
  urlCrear?: string;
  mostrarAgregar?: boolean;
  mostrarRefrescar?: boolean;
}

export const crearBotonesProgramados = (
  acciones: AccionesBotonesProgramadosProps
): ConfiguracionBotonTabla[] => {
  const {
    onRefrescar,
    cargandoRefresh,
    urlCrear = "/jobs/crear",
    mostrarAgregar = true,
    mostrarRefrescar = true,
  } = acciones;

  const botones: ConfiguracionBotonTabla[] = [];

  // Botón Agregar Job
  if (mostrarAgregar) {
    botones.push({
      key: 'agregar-job',
      posicion: PosicionBotonTabla.ABAJO_DERECHA,
      orden: 1,
      visible: true,
      contenido: (
        <BotonRedirect 
          href={urlCrear}
          texto="Agregar Job"
          icono={<PlusOutlined />}
          tipo="primary"
          variante="solido"
          tamaño="mediano"
          ajustarAlTexto
          aria-label="Agregar nuevo job programado"
        />
      ),
    });
  }

  // Botón Refrescar
  if (mostrarRefrescar) {
    botones.push({
      key: 'refrescar-datos',
      posicion: PosicionBotonTabla.ABAJO_DERECHA,
      orden: 2,
      visible: true,
      contenido: (
        <BotonPrimario
          texto="Refrescar"
          icono={<ReloadOutlined />}
          onClick={onRefrescar}
          cargando={cargandoRefresh}
          color="lightBlue"
          variante="outline"
          tamaño="mediano"
          ajustarAlTexto
          aria-label="Refrescar lista de jobs programados"
        />
      ),
    });
  }

  return botones;
}; 