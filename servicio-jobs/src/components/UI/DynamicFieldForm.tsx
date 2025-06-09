import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

// Tipos de campos permitidos
export type TipoCampo = 'input' | 'select' | 'checkbox' | 'textarea';

// Tamaños de campo usando clases de Tailwind
export type TamanoCampo = 'col-3' | 'col-4' | 'col-6' | 'col-8' | 'col-12';

// Interfaz para definir un tipo de campo permitido
export interface ConfiguracionCampo {
  tipo: TipoCampo;
  label: string;
  tamaño: TamanoCampo;
  opciones?: string[]; // Para selects
  placeholder?: string;
}

// Interfaz para un campo individual
export interface Campo {
  id: string;
  nombre: string;
  valor: string | boolean;
  tipo: TipoCampo;
  tamaño: TamanoCampo;
  opciones?: string[];
}

// Interfaz para los datos de una pestaña
export interface DatosPestaña {
  [key: string]: Campo[];
}

// Props del componente principal
export interface DynamicFieldFormProps {
  pestañas?: string[];
  tiposCamposPermitidos: ConfiguracionCampo[];
  cantidadMaximaCampos?: number;
  onChange: (datos: DatosPestaña) => void;
  valoresIniciales?: DatosPestaña;
  className?: string;
}

const DynamicFieldForm: React.FC<DynamicFieldFormProps> = ({
  pestañas = ['Query Params', 'Headers'],
  tiposCamposPermitidos,
  cantidadMaximaCampos = 10,
  onChange,
  valoresIniciales = {},
  className = ''
}) => {
  const [pestañaActiva, setPestañaActiva] = useState(pestañas[0]);
  const [datos, setDatos] = useState<DatosPestaña>(() => {
    const datosIniciales: DatosPestaña = {};
    pestañas.forEach(pestaña => {
      datosIniciales[pestaña] = valoresIniciales[pestaña] || [];
    });
    return datosIniciales;
  });

  // Emitir cambios al padre
  useEffect(() => {
    onChange(datos);
  }, [datos, onChange]);

  // Generar ID único para campos
  const generarId = () => `campo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Agregar nuevo campo
  const agregarCampo = (configuracion: ConfiguracionCampo) => {
    const camposActuales = datos[pestañaActiva] || [];
    if (camposActuales.length >= cantidadMaximaCampos) {
      alert(`Máximo ${cantidadMaximaCampos} campos permitidos`);
      return;
    }

    const nuevoCampo: Campo = {
      id: generarId(),
      nombre: '',
      valor: configuracion.tipo === 'checkbox' ? false : '',
      tipo: configuracion.tipo,
      tamaño: configuracion.tamaño,
      opciones: configuracion.opciones
    };

    setDatos(prev => ({
      ...prev,
      [pestañaActiva]: [...(prev[pestañaActiva] || []), nuevoCampo]
    }));
  };

  // Eliminar campo
  const eliminarCampo = (id: string) => {
    setDatos(prev => ({
      ...prev,
      [pestañaActiva]: (prev[pestañaActiva] || []).filter(campo => campo.id !== id)
    }));
  };

  // Actualizar campo
  const actualizarCampo = (id: string, propiedad: 'nombre' | 'valor', nuevoValor: string | boolean) => {
    setDatos(prev => ({
      ...prev,
      [pestañaActiva]: (prev[pestañaActiva] || []).map(campo =>
        campo.id === id ? { ...campo, [propiedad]: nuevoValor } : campo
      )
    }));
  };

  // Obtener clase de grid para Tailwind
  const obtenerClaseGrid = (tamaño: TamanoCampo) => {
    const mapeoTamaños = {
      'col-3': 'col-span-3',
      'col-4': 'col-span-4', 
      'col-6': 'col-span-6',
      'col-8': 'col-span-8',
      'col-12': 'col-span-12'
    };
    return mapeoTamaños[tamaño] || 'col-span-12';
  };

  // Renderizar campo según su tipo
  const renderizarCampo = (campo: Campo) => {
    const claseInput = "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white";

    switch (campo.tipo) {
      case 'input':
        return (
          <input
            type="text"
            value={campo.valor as string}
            onChange={(e) => actualizarCampo(campo.id, 'valor', e.target.value)}
            className={claseInput}
            placeholder="Valor"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={campo.valor as string}
            onChange={(e) => actualizarCampo(campo.id, 'valor', e.target.value)}
            className={`${claseInput} min-h-[80px] resize-y`}
            placeholder="Valor"
            rows={3}
          />
        );

      case 'select':
        return (
          <select
            value={campo.valor as string}
            onChange={(e) => actualizarCampo(campo.id, 'valor', e.target.value)}
            className={claseInput}
          >
            <option value="">Seleccionar...</option>
            {campo.opciones?.map((opcion, idx) => (
              <option key={idx} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={campo.valor as boolean}
              onChange={(e) => actualizarCampo(campo.id, 'valor', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {campo.valor ? 'Activado' : 'Desactivado'}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  const camposActuales = datos[pestañaActiva] || [];

  return (
    <div className={`w-full ${className}`}>
      {/* Pestañas */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {pestañas.map((pestaña) => (
            <button
              key={pestaña}
              onClick={() => setPestañaActiva(pestaña)}
              className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                pestañaActiva === pestaña
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {pestaña}
              {camposActuales.length > 0 && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {camposActuales.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="mt-6">
        {/* Campos existentes */}
        {camposActuales.length > 0 ? (
          <div className="space-y-4">
            {camposActuales.map((campo) => (
              <div
                key={campo.id}
                className={`grid grid-cols-12 gap-4 items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${obtenerClaseGrid(campo.tamaño)}`}
              >
                {/* Campo Nombre */}
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={campo.nombre}
                    onChange={(e) => actualizarCampo(campo.id, 'nombre', e.target.value)}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Clave"
                  />
                </div>

                {/* Campo Valor */}
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Valor
                  </label>
                  {renderizarCampo(campo)}
                </div>

                {/* Botón eliminar */}
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => eliminarCampo(campo.id)}
                    className="mt-6 flex items-center justify-center w-8 h-8 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                    title="Eliminar campo"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No hay campos en esta pestaña</p>
            <p className="text-sm">Utiliza los botones de abajo para agregar campos</p>
          </div>
        )}

        {/* Botones para agregar campos */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Agregar Campo ({camposActuales.length}/{cantidadMaximaCampos})
          </h3>
          <div className="flex flex-wrap gap-2">
            {tiposCamposPermitidos.map((configuracion, idx) => (
              <button
                key={idx}
                onClick={() => agregarCampo(configuracion)}
                disabled={camposActuales.length >= cantidadMaximaCampos}
                className="inline-flex items-center gap-2 rounded bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FaPlus size={12} />
                {configuracion.label}
                <span className="text-xs opacity-75">({configuracion.tamaño})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        {camposActuales.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Campos en {pestañaActiva}:</strong> {camposActuales.length}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Los cambios se guardan automáticamente
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicFieldForm; 