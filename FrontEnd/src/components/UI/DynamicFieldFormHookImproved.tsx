import React, { useState, useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import HookFormInput from '../FormulariosControles/React-Hook-Form/HookFormInput';
import HookFormTextarea from '../FormulariosControles/React-Hook-Form/HookFormTextarea';
import HookFormCheckbox from '../FormulariosControles/React-Hook-Form/HookFormCheckbox';
import SelectFormHook from '../FormulariosControles/React-Hook-Form/SelectFormHook';

// Tipos de campos permitidos
export type TipoCampoHook = 'input' | 'select' | 'checkbox' | 'textarea';

// Tamaños de campo
export type TamanoCampoHook = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

// Interfaz para definir un tipo de campo permitido
export interface ConfiguracionCampoHook {
  tipo: TipoCampoHook;
  label: string;
  tamaño: TamanoCampoHook;
  opciones?: { valor: string; etiqueta: string }[]; // Para selects
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
}

// Interfaz para un campo individual en el formulario
export interface CampoFormularioMejorado {
  nombre: string;
  valor: string;
  tipo: TipoCampoHook;
  activo?: boolean; // Para checkboxes
}

// Estructura de datos del formulario por pestaña
export interface FormularioTabData {
  [key: string]: CampoFormularioMejorado[];
}

// Estructura de datos para React Hook Form
interface FormData {
  tabs: {
    [key: string]: CampoFormularioMejorado[];
  };
}

// Props del componente principal
export interface DynamicFieldFormHookImprovedProps {
  pestañas?: string[];
  tiposCamposPermitidos: ConfiguracionCampoHook[];
  cantidadMaximaCampos?: number;
  onSubmit: (datos: FormularioTabData) => void;
  onChange?: (datos: FormularioTabData) => void;
  valoresIniciales?: FormularioTabData;
  className?: string;
  textoBotonEnvio?: string;
  mostrarBotonEnvio?: boolean;
}

const DynamicFieldFormHookImproved: React.FC<DynamicFieldFormHookImprovedProps> = ({
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

  // Inicializar valores por defecto para cada pestaña
  const valoresInicialesPorDefecto: FormData = {
    tabs: {}
  };

  pestañas.forEach(pestaña => {
    valoresInicialesPorDefecto.tabs[pestaña] = valoresIniciales[pestaña] || [];
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset
  } = useForm<FormData>({
    defaultValues: valoresInicialesPorDefecto,
    mode: 'onChange'
  });

  // Crear fieldArrays para pestañas predefinidas (máximo 6 pestañas para evitar problemas con Hooks)
  const fieldArray0 = useFieldArray({ control, name: `tabs.${pestañas[0] || 'tab0'}` });
  const fieldArray1 = useFieldArray({ control, name: `tabs.${pestañas[1] || 'tab1'}` });
  const fieldArray2 = useFieldArray({ control, name: `tabs.${pestañas[2] || 'tab2'}` });
  const fieldArray3 = useFieldArray({ control, name: `tabs.${pestañas[3] || 'tab3'}` });
  const fieldArray4 = useFieldArray({ control, name: `tabs.${pestañas[4] || 'tab4'}` });
  const fieldArray5 = useFieldArray({ control, name: `tabs.${pestañas[5] || 'tab5'}` });

  // Mapear fieldArrays por nombre de pestaña
  const fieldArrays = useMemo(() => {
    const arrays: Record<string, any> = {};
    const fieldArrayList = [fieldArray0, fieldArray1, fieldArray2, fieldArray3, fieldArray4, fieldArray5];
    
    pestañas.forEach((pestaña, index) => {
      if (index < fieldArrayList.length) {
        arrays[pestaña] = fieldArrayList[index];
      }
    });
    
    return arrays;
  }, [pestañas, fieldArray0, fieldArray1, fieldArray2, fieldArray3, fieldArray4, fieldArray5]);

  // Observar cambios en el formulario
  const watchedValues = watch();

  // Emitir cambios al padre
  useEffect(() => {
    if (onChange && watchedValues.tabs) {
      onChange(watchedValues.tabs);
    }
  }, [watchedValues, onChange]);

  // Agregar nuevo campo
  const agregarCampo = (configuracion: ConfiguracionCampoHook) => {
    const camposActuales = getValues(`tabs.${pestañaActiva}`) || [];
    if (camposActuales.length >= cantidadMaximaCampos) {
      alert(`Máximo ${cantidadMaximaCampos} campos permitidos en ${pestañaActiva}`);
      return;
    }

    const nuevoCampo: CampoFormularioMejorado = {
      nombre: '',
      valor: configuracion.tipo === 'checkbox' ? 'false' : '',
      tipo: configuracion.tipo,
      ...(configuracion.tipo === 'checkbox' && { activo: false })
    };

    const fieldArray = fieldArrays[pestañaActiva];
    fieldArray.append(nuevoCampo);
  };

  // Eliminar campo
  const eliminarCampo = (index: number) => {
    const fieldArray = fieldArrays[pestañaActiva];
    fieldArray.remove(index);
  };

  // Renderizar campo según su tipo usando los componentes existentes
  const renderizarCampo = (campo: CampoFormularioMejorado, configuracion: ConfiguracionCampoHook, index: number) => {
    const baseName = `tabs.${pestañaActiva}.${index}` as const;
    const nombreFieldName = `${baseName}.nombre` as const;
    const valorFieldName = `${baseName}.valor` as const;
    const activoFieldName = `${baseName}.activo` as const;

    switch (configuracion.tipo) {
      case 'input':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <HookFormInput
                label="Nombre"
                name={nombreFieldName}
                register={register}
                errors={errors}
                placeholder="Clave"
                colSpan="12"
                required={configuracion.required ? configuracion.requiredMessage || "Este campo es requerido" : undefined}
                pattern={configuracion.pattern}
                minLength={configuracion.minLength}
                maxLength={configuracion.maxLength}
              />
            </div>
            <div className="col-span-6">
              <HookFormInput
                label="Valor"
                name={valorFieldName}
                register={register}
                errors={errors}
                placeholder={configuracion.placeholder || "Valor"}
                colSpan="12"
                required={configuracion.required ? configuracion.requiredMessage || "Este campo es requerido" : undefined}
                pattern={configuracion.pattern}
                minLength={configuracion.minLength}
                maxLength={configuracion.maxLength}
              />
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <HookFormInput
                label="Nombre"
                name={nombreFieldName}
                register={register}
                errors={errors}
                placeholder="Clave"
                colSpan="12"
                required={configuracion.required ? configuracion.requiredMessage || "Este campo es requerido" : undefined}
              />
            </div>
            <div className="col-span-6">
              <HookFormTextarea
                label="Valor"
                name={valorFieldName}
                register={register}
                errors={errors}
                placeholder={configuracion.placeholder || "Valor"}
                colSpan="12"
                rows={3}
              />
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <HookFormInput
                label="Nombre"
                name={nombreFieldName}
                register={register}
                errors={errors}
                placeholder="Clave"
                colSpan="12"
                required={configuracion.required ? configuracion.requiredMessage || "Este campo es requerido" : undefined}
              />
            </div>
            <div className="col-span-6">
              <SelectFormHook
                etiqueta="Valor"
                name={valorFieldName}
                opciones={configuracion.opciones || []}
                register={register}
                errors={errors}
                valorSeleccionado={watch(valorFieldName) || ''}
                onChange={(valor) => setValue(valorFieldName, valor)}
                colSpan="12"
              />
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <HookFormInput
                label="Nombre"
                name={nombreFieldName}
                register={register}
                errors={errors}
                placeholder="Clave"
                colSpan="12"
                required={configuracion.required ? configuracion.requiredMessage || "Este campo es requerido" : undefined}
              />
            </div>
            <div className="col-span-6">
              <HookFormCheckbox
                label="Activado"
                name={activoFieldName}
                register={register}
                errors={errors}
                colSpan="12"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const camposActuales = watchedValues.tabs?.[pestañaActiva] || [];

  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data.tabs);
  });

  return (
    <div className={`w-full ${className}`}>
      {/* Pestañas */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {pestañas.map((pestaña) => {
            const camposPestaña = watchedValues.tabs?.[pestaña] || [];
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
      <form onSubmit={onFormSubmit}>
        <div className="mt-6">
          {/* Campos existentes */}
          {camposActuales.length > 0 ? (
            <div className="space-y-4">
              {camposActuales.map((campo, index) => {
                const tipoConfigurado = tiposCamposPermitidos.find(config => config.tipo === campo.tipo);
                if (!tipoConfigurado) return null;

                return (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {renderizarCampo(campo, tipoConfigurado, index)}
                      </div>
                      
                      {/* Botón eliminar */}
                      <button
                        type="button"
                        onClick={() => eliminarCampo(index)}
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
                Los cambios se validan automáticamente con React Hook Form
              </p>
              {Object.keys(errors).length > 0 && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  ⚠️ Hay errores de validación en el formulario
                </p>
              )}
            </div>
          )}

          {/* Botón de envío */}
          {mostrarBotonEnvio && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Object.keys(errors).length > 0}
              >
                {textoBotonEnvio}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default DynamicFieldFormHookImproved; 