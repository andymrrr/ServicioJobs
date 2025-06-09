import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import HookFormInput from '../FormulariosControles/React-Hook-Form/HookFormInput';
import HookFormTextarea from '../FormulariosControles/React-Hook-Form/HookFormTextarea';
import HookFormCheckbox from '../FormulariosControles/React-Hook-Form/HookFormCheckbox';

// Tipos de campos permitidos
export type TipoCampoHook = 'input' | 'select' | 'checkbox' | 'textarea';

// Tamaños de campo
export type TamanoCampoHook = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

// Interfaz para definir un tipo de campo permitido
export interface ConfiguracionCampoHook {
  tipo: TipoCampoHook;
  label: string;
  tamaño: TamanoCampoHook;
  opciones?: string[]; // Para selects
  placeholder?: string;
  required?: boolean;
}

// Interfaz para un campo individual
export interface CampoFormulario {
  id: string;
  nombre: string;
  valor: string;
  tipo: TipoCampoHook;
  activo?: boolean; // Para checkboxes
}

// Interfaz para los datos del formulario por pestaña
export interface FormularioDatos {
  [key: string]: CampoFormulario[];
}

// Props del componente principal
export interface DynamicFieldFormHookProps {
  pestañas?: string[];
  tiposCamposPermitidos: ConfiguracionCampoHook[];
  cantidadMaximaCampos?: number;
  onSubmit: (datos: FormularioDatos) => void;
  onChange?: (datos: FormularioDatos) => void;
  valoresIniciales?: FormularioDatos;
  className?: string;
  textoBotonEnvio?: string;
  mostrarBotonEnvio?: boolean;
}

const DynamicFieldFormHookFixed: React.FC<DynamicFieldFormHookProps> = ({
  pestañas = ['Query Params', 'Headers'],
  tiposCamposPermitidos,
  cantidadMaximaCampos = 10,
  onSubmit,
  onChange,
  valoresIniciales = {},
  className = '',
  textoBotonEnvio = 'Guardar',
  mostrarBotonEnvio = true
}) => {
  const [pestañaActiva, setPestañaActiva] = useState(pestañas[0]);
  
  // Estado local para manejar los campos de cada pestaña
  const [camposPorPestaña, setCamposPorPestaña] = useState<FormularioDatos>(() => {
    const inicial: FormularioDatos = {};
    pestañas.forEach(pestaña => {
      inicial[pestaña] = valoresIniciales[pestaña] || [];
    });
    return inicial;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  // Observar cambios en el formulario
  const watchedValues = watch();

  // Emitir cambios al padre
  useEffect(() => {
    if (onChange) {
      onChange(camposPorPestaña);
    }
  }, [camposPorPestaña, onChange]);

  // Generar ID único para campos
  const generarId = () => `campo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Agregar nuevo campo
  const agregarCampo = (configuracion: ConfiguracionCampoHook) => {
    const camposActuales = camposPorPestaña[pestañaActiva] || [];
    if (camposActuales.length >= cantidadMaximaCampos) {
      alert(`Máximo ${cantidadMaximaCampos} campos permitidos`);
      return;
    }

    const nuevoCampo: CampoFormulario = {
      id: generarId(),
      nombre: '',
      valor: configuracion.tipo === 'checkbox' ? 'false' : '',
      tipo: configuracion.tipo,
      ...(configuracion.tipo === 'checkbox' && { activo: false })
    };

    setCamposPorPestaña(prev => ({
      ...prev,
      [pestañaActiva]: [...(prev[pestañaActiva] || []), nuevoCampo]
    }));
  };

  // Eliminar campo
  const eliminarCampo = (id: string) => {
    setCamposPorPestaña(prev => ({
      ...prev,
      [pestañaActiva]: (prev[pestañaActiva] || []).filter(campo => campo.id !== id)
    }));
  };

  // Actualizar campo
  const actualizarCampo = (id: string, propiedad: 'nombre' | 'valor' | 'activo', nuevoValor: string | boolean) => {
    setCamposPorPestaña(prev => ({
      ...prev,
      [pestañaActiva]: (prev[pestañaActiva] || []).map(campo =>
        campo.id === id ? { ...campo, [propiedad]: nuevoValor } : campo
      )
    }));
  };

  // Renderizar campo según su tipo
  const renderizarCampo = (campo: CampoFormulario, configuracion: ConfiguracionCampoHook) => {
    const claseInput = "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white";

    switch (configuracion.tipo) {
      case 'input':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={campo.nombre}
                onChange={(e) => actualizarCampo(campo.id, 'nombre', e.target.value)}
                className={claseInput}
                placeholder="Clave"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Valor
              </label>
              <input
                type="text"
                value={campo.valor}
                onChange={(e) => actualizarCampo(campo.id, 'valor', e.target.value)}
                className={claseInput}
                placeholder={configuracion.placeholder || "Valor"}
              />
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={campo.nombre}
                onChange={(e) => actualizarCampo(campo.id, 'nombre', e.target.value)}
                className={claseInput}
                placeholder="Clave"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Valor
              </label>
              <textarea
                value={campo.valor}
                onChange={(e) => actualizarCampo(campo.id, 'valor', e.target.value)}
                className={`${claseInput} min-h-[80px] resize-y`}
                placeholder={configuracion.placeholder || "Valor"}
                rows={3}
              />
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={campo.nombre}
                onChange={(e) => actualizarCampo(campo.id, 'nombre', e.target.value)}
                className={claseInput}
                placeholder="Clave"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Valor
              </label>
              <select
                value={campo.valor}
                onChange={(e) => actualizarCampo(campo.id, 'valor', e.target.value)}
                className={claseInput}
              >
                <option value="">Seleccionar...</option>
                {configuracion.opciones?.map((opcion, idx) => (
                  <option key={idx} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={campo.nombre}
                onChange={(e) => actualizarCampo(campo.id, 'nombre', e.target.value)}
                className={claseInput}
                placeholder="Clave"
              />
            </div>
            <div className="col-span-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={campo.activo || false}
                  onChange={(e) => actualizarCampo(campo.id, 'activo', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {campo.activo ? 'Activado' : 'Desactivado'}
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const camposActuales = camposPorPestaña[pestañaActiva] || [];

  const onFormSubmit = () => {
    onSubmit(camposPorPestaña);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Pestañas */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {pestañas.map((pestaña) => {
            const camposPestaña = camposPorPestaña[pestaña] || [];
            return (
              <button
                key={pestaña}
                type="button"
                onClick={() => setPestañaActiva(pestaña)}
                className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                  pestañaActiva === pestaña
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {pestaña}
                {camposPestaña.length > 0 && (
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {camposPestaña.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="mt-6">
        {/* Campos existentes */}
        {camposActuales.length > 0 ? (
          <div className="space-y-4">
            {camposActuales.map((campo) => {
              const tipoConfigurado = tiposCamposPermitidos.find(config => config.tipo === campo.tipo);
              if (!tipoConfigurado) return null;

              return (
                <div
                  key={campo.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {renderizarCampo(campo, tipoConfigurado)}
                    </div>
                    
                    {/* Botón eliminar */}
                    <button
                      type="button"
                      onClick={() => eliminarCampo(campo.id)}
                      className="ml-4 flex items-center justify-center w-8 h-8 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                      title="Eliminar campo"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
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
                type="button"
                onClick={() => agregarCampo(configuracion)}
                disabled={camposActuales.length >= cantidadMaximaCampos}
                className="inline-flex items-center gap-2 rounded bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FaPlus size={12} />
                {configuracion.label}
                <span className="text-xs opacity-75">(col-{configuracion.tamaño})</span>
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

        {/* Botón de envío */}
        {mostrarBotonEnvio && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onFormSubmit}
              className="inline-flex items-center gap-2 rounded bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              {textoBotonEnvio}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicFieldFormHookFixed; 