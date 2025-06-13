import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FieldRendererProps } from './types';
import HookFormInput from '../HookFormInput/HookFormInput';
import HookFormCheckbox from '../HookFormCheckbox/HookFormCheckbox';
import HookFormTextarea from '../HookFormTextTarea/HookFormTextarea';
import { HookFormSelect as SelectFormHook } from '../HookFormSelect/HookFormSelect';

const FieldRenderer: React.FC<FieldRendererProps> = ({
  // campo,
  configuracion,
  index,
  basePath,
  pestañaActiva,
  register,
  errors,
  watch,
  setValue,
  onDelete
}) => {
  const baseFieldName = `${basePath}.${pestañaActiva}.${index}` as const;
  const nombreFieldName = `${baseFieldName}.nombre` as const;
  const valorFieldName = `${baseFieldName}.valor` as const;
  const activoFieldName = `${baseFieldName}.activo` as const;

  const renderFieldContent = () => {
    switch (configuracion.tipo) {
      case 'input':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
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
            <div className="col-span-5">
              <HookFormInput
                label="Valor"
                name={valorFieldName}
                register={register}
                errors={errors}
                placeholder="Valor"
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
                label="Valor"
                name={valorFieldName}
                options={configuracion.opciones?.map(opcion => ({ 
                  value: opcion.valor, 
                  label: opcion.etiqueta 
                })) || []}
                register={register}
                errors={errors}
                selectedValue={watch(valorFieldName) || ''}
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

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {renderFieldContent()}
        </div>
        
        {/* Botón eliminar */}
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="ml-4 flex items-center justify-center w-8 h-8 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
          title="Eliminar campo"
        >
          <FaTrash size={12} />
        </button>
      </div>
    </div>
  );
};

export default FieldRenderer; 