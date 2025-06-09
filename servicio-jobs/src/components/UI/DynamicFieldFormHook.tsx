import React, { useState, useEffect } from 'react';
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
  opciones?: string[]; // Para selects
  placeholder?: string;
  required?: boolean;
}

// Interfaz para un campo individual en el formulario
export interface CampoFormulario {
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

const DynamicFieldFormHook: React.FC<DynamicFieldFormHookProps> = ({
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

  // Crear el esquema inicial del formulario
  const crearEsquemaInicial = () => {
    const esquema: any = {};
    pestañas.forEach(pestaña => {
      esquema[pestaña] = valoresIniciales[pestaña] || [];
    });
    return esquema;
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm({
    defaultValues: crearEsquemaInicial()
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: pestañaActiva
  });

  // Observar cambios en el formulario
  const watchedValues = watch();

  useEffect(() => {
    if (onChange) {
      onChange(watchedValues as FormularioDatos);
    }
  }, [watchedValues, onChange]);

  // Agregar nuevo campo
  const agregarCampo = (configuracion: ConfiguracionCampoHook) => {
    const camposActuales = fields || [];
    if (camposActuales.length >= cantidadMaximaCampos) {
      alert(`Máximo ${cantidadMaximaCampos} campos permitidos`);
      return;
    }

    const nuevoCampo: CampoFormulario = {
      nombre: '',
      valor: configuracion.tipo === 'checkbox' ? 'false' : '',
      tipo: configuracion.tipo,
      ...(configuracion.tipo === 'checkbox' && { activo: false })
    };

    append(nuevoCampo);
  };

  // Eliminar campo
  const eliminarCampo = (indice: number) => {
    remove(indice);
  };

  // Renderizar campo según su tipo
  const renderizarCampo = (indice: number, configuracion: ConfiguracionCampoHook) => {
    const baseName = `${pestañaActiva}.${indice}`;

    switch (configuracion.tipo) {
      case 'input':
        return (
          <div className="grid grid-cols-12 gap-4">
            <HookFormInput
              label="Nombre"
              name={`${baseName}.nombre` as any}
              register={register}
              errors={errors}
              placeholder="Clave"
              colSpan="4"
              required={configuracion.required ? "El nombre es requerido" : undefined}
            />
            <HookFormInput
              label="Valor"
              name={`${baseName}.valor` as any}
              register={register}
              errors={errors}
              placeholder={configuracion.placeholder || "Valor"}
              colSpan="6"
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="grid grid-cols-12 gap-4">
            <HookFormInput
              label="Nombre"
              name={`${baseName}.nombre` as any}
              register={register}
              errors={errors}
              placeholder="Clave"
              colSpan="4"
              required={configuracion.required ? "El nombre es requerido" : undefined}
            />
            <HookFormTextarea
              label="Valor"
              name={`${baseName}.valor` as any}
              register={register}
              errors={errors}
              placeholder={configuracion.placeholder || "Valor"}
              colSpan="6"
            />
          </div>
        );

      case 'select':
        return (
          <div className="grid grid-cols-12 gap-4">
            <HookFormInput
              label="Nombre"
              name={`${baseName}.nombre` as any}
              register={register}
              errors={errors}
              placeholder="Clave"
              colSpan="4"
              required={configuracion.required ? "El nombre es requerido" : undefined}
            />
            <div className="col-span-6">
              <label className="mb-1 block text-black dark:text-white">Valor</label>
              <select
                {...register(`${baseName}.valor` as any)}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
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
            <HookFormInput
              label="Nombre"
              name={`${baseName}.nombre` as any}
              register={register}
              errors={errors}
              placeholder="Clave"
              colSpan="4"
              required={configuracion.required ? "El nombre es requerido" : undefined}
            />
            <div className="col-span-6">
              <HookFormCheckbox
                label="Activado"
                name={`${baseName}.activo` as any}
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

  const camposActuales = fields || [];

  const onFormSubmit = (data: any) => {
    onSubmit(data as FormularioDatos);
  };

  // Cambiar pestaña - recrear useFieldArray
  const cambiarPestaña = (nuevaPestaña: string) => {
    setPestañaActiva(nuevaPestaña);
  };

  // Hook separado para cada pestaña
  const FieldArrayComponent = () => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: pestañaActiva
    });

    return (
      <>
        {/* Campos existentes */}
        {fields.length > 0 ? (
          <div className="space-y-6">
            {fields.map((campo: any, indice: number) => {
              const tipoConfigurado = tiposCamposPermitidos.find(config => config.tipo === campo.tipo);
              if (!tipoConfigurado) return null;

              return (
                <div
                  key={campo.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {renderizarCampo(indice, tipoConfigurado)}
                    </div>
                    
                    {/* Botón eliminar */}
                    <button
                      type="button"
                      onClick={() => remove(indice)}
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
            Agregar Campo ({fields.length}/{cantidadMaximaCampos})
          </h3>
          <div className="flex flex-wrap gap-2">
            {tiposCamposPermitidos.map((configuracion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (fields.length >= cantidadMaximaCampos) {
                    alert(`Máximo ${cantidadMaximaCampos} campos permitidos`);
                    return;
                  }
                  
                  const nuevoCampo: CampoFormulario = {
                    nombre: '',
                    valor: configuracion.tipo === 'checkbox' ? 'false' : '',
                    tipo: configuracion.tipo,
                    ...(configuracion.tipo === 'checkbox' && { activo: false })
                  };
                  
                  append(nuevoCampo);
                }}
                disabled={fields.length >= cantidadMaximaCampos}
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
        {fields.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Campos en {pestañaActiva}:</strong> {fields.length}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Los cambios se validan con React Hook Form
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Pestañas */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {pestañas.map((pestaña) => {
              const camposPestaña = watchedValues[pestaña] || [];
              return (
                <button
                  key={pestaña}
                  type="button"
                  onClick={() => cambiarPestaña(pestaña)}
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
          <FieldArrayComponent />

          {/* Botón de envío */}
          {mostrarBotonEnvio && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
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

export default DynamicFieldFormHook; 