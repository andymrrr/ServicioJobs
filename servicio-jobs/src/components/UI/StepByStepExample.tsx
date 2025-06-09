import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCheck, FaCog } from 'react-icons/fa';
import StepByStep from './StepByStep';
import Tarjeta from './Tarjeta';

const StepByStepExample = () => {
  const [pasoActual, setPasoActual] = useState(0);

  const pasosEjemplo = [
    {
      id: 1,
      titulo: 'Configuración',
      descripcion: 'Configurar parámetros básicos',
      icono: <FaCog size={16} />
    },
    {
      id: 2,
      titulo: 'Usuario',
      descripcion: 'Información del usuario',
      icono: <FaUser size={16} />
    },
    {
      id: 3,
      titulo: 'Contacto',
      descripcion: 'Detalles de contacto',
      icono: <FaEnvelope size={16} />
    },
    {
      id: 4,
      titulo: 'Ubicación',
      descripcion: 'Dirección y ubicación',
      icono: <FaMapMarkerAlt size={16} />
    },
    {
      id: 5,
      titulo: 'Completar',
      descripcion: 'Finalizar proceso',
      icono: <FaCheck size={16} />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Ejemplo Horizontal */}
      <Tarjeta
        titulo="Ejemplo Horizontal"
        subtitulo="Componente StepByStep en modo horizontal"
        variante="defecto"
      >
        <div className="p-6">
          <StepByStep
            pasos={pasosEjemplo}
            pasoActual={pasoActual}
            onPasoClick={setPasoActual}
            tema="horizontal"
            mostrarDescripcion={true}
          />
          
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPasoActual(Math.max(0, pasoActual - 1))}
              disabled={pasoActual === 0}
              className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200"
            >
              Anterior
            </button>
            <button
              onClick={() => setPasoActual(Math.min(pasosEjemplo.length - 1, pasoActual + 1))}
              disabled={pasoActual === pasosEjemplo.length - 1}
              className="rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </Tarjeta>

      {/* Ejemplo Vertical */}
      <Tarjeta
        titulo="Ejemplo Vertical"
        subtitulo="Componente StepByStep en modo vertical"
        variante="defecto"
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <StepByStep
                pasos={pasosEjemplo.slice(0, 3)}
                pasoActual={pasoActual}
                onPasoClick={setPasoActual}
                tema="vertical"
                mostrarDescripcion={true}
              />
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso Actual:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {pasosEjemplo[pasoActual]?.titulo || 'N/A'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {pasosEjemplo[pasoActual]?.descripcion || 'Sin descripción'}
              </p>
            </div>
          </div>
        </div>
      </Tarjeta>
    </div>
  );
};

export default StepByStepExample; 