import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaCheckDouble, FaEnvelope, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import EtiquetaEstado from './Etiqueta-Estado';

interface Notificacion {
  id: string;
  tipo: 'info' | 'exito' | 'advertencia' | 'error';
  titulo: string;
  mensaje: string;
  tiempo: string;
  leida: boolean;
  link?: string;
}

const DropdownNotification = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      tipo: 'info',
      titulo: 'Nuevo mensaje',
      mensaje: 'Has recibido un nuevo mensaje de soporte',
      tiempo: 'Hace 5 minutos',
      leida: false,
      link: '/mensajes'
    },
    {
      id: '2',
      tipo: 'exito',
      titulo: 'Tarea completada',
      mensaje: 'El reporte mensual ha sido generado exitosamente',
      tiempo: 'Hace 2 horas',
      leida: false
    },
    {
      id: '3',
      tipo: 'advertencia',
      titulo: 'Espacio de almacenamiento',
      mensaje: 'Tu espacio de almacenamiento está al 80%',
      tiempo: 'Hace 1 día',
      leida: true
    },
    {
      id: '4',
      tipo: 'error',
      titulo: 'Error de sincronización',
      mensaje: 'No se pudo sincronizar con el servidor',
      tiempo: 'Hace 3 días',
      leida: true
    }
  ]);

  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // Cerrar con tecla Escape
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownAbierto || keyCode !== 27) return;
      setDropdownAbierto(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownAbierto ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownAbierto(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Marcar todas como leídas
  const marcarTodasComoLeidas = () => {
    setNotificaciones(notificaciones.map(n => ({ ...n, leida: true })));
  };

  // Marcar una como leída
  const marcarComoLeida = (id: string) => {
    setNotificaciones(
      notificaciones.map(n => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  // Obtener el icono según el tipo
  const obtenerIcono = (tipo: Notificacion['tipo']) => {
    switch (tipo) {
      case 'info':
        return <FaInfoCircle className="text-info" />;
      case 'exito':
        return <FaCheckDouble className="text-success" />;
      case 'advertencia':
        return <FaExclamationTriangle className="text-warning" />;
      case 'error':
        return <FaExclamationTriangle className="text-danger" />;
      default:
        return <FaBell className="text-primary" />;
    }
  };

  // Contar notificaciones no leídas
  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownAbierto(!dropdownAbierto)}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <FaBell />
        {noLeidas > 0 && (
          <span className="absolute -top-0.5 -right-0.5 z-1 h-4 w-4 rounded-full bg-danger text-xs font-medium text-white flex items-center justify-center">
            {noLeidas}
          </span>
        )}
      </button>

      {/* Panel Desplegable */}
      <div
        ref={dropdown}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownAbierto ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-bodydark2">Notificaciones</h5>
            {noLeidas > 0 && (
              <button
                onClick={marcarTodasComoLeidas}
                className="text-xs hover:text-primary"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notificaciones.map(notificacion => (
            <li key={notificacion.id}>
              <Link
                onClick={() => marcarComoLeida(notificacion.id)}
                to={notificacion.link || '#'}
                className={`flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 ${
                  !notificacion.leida ? 'bg-gray-1 dark:bg-meta-3' : ''
                }`}
              >
                <div className="h-12.5 w-12.5 rounded-full flex items-center justify-center bg-gray-2 dark:bg-meta-4">
                  {obtenerIcono(notificacion.tipo)}
                </div>

                <div className="flex flex-1 items-start justify-between">
                  <div>
                    <h6 className="font-medium text-black dark:text-white">
                      {notificacion.titulo}
                      {!notificacion.leida && (
                        <EtiquetaEstado
                          texto="Nueva"
                          estado="info"
                          tamaño="pequeño"
                          className="ml-2"
                        />
                      )}
                    </h6>
                    <p className="text-sm">{notificacion.mensaje}</p>
                    <p className="text-xs text-gray-400">{notificacion.tiempo}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification; 