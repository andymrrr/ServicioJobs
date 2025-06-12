import React, { useState, useEffect, useMemo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { 
  HookFormDinamicoProps, 
  CampoFormularioMejorado, 
  ConfiguracionCampoHook 
} from './types';
import TabNavigation from './TabNavigation';
import FieldRenderer from './FieldRenderer';
import ActionButtons from './ActionButtons';
import StatusInfo from './StatusInfo';
import EmptyState from './EmptyState';

const HookFormDinamico: React.FC<HookFormDinamicoProps> = ({
  pestañas = ['Query Params', 'Headers'],
  tiposCamposPermitidos,
  cantidadMaximaCampos = 10,
  onChange,
  className = '',
  basePath = 'configuracionAPI',
  control,
  register,
  errors,
  watch,
  setValue,
  getValues
}) => {
  const [pestañaActiva, setPestañaActiva] = useState(pestañas[0]);

  // Crear fieldArrays para pestañas predefinidas (máximo 6 pestañas para evitar problemas con Hooks)
  const fieldArray0 = useFieldArray({ control, name: `${basePath}.${pestañas[0] || 'tab0'}` });
  const fieldArray1 = useFieldArray({ control, name: `${basePath}.${pestañas[1] || 'tab1'}` });
  const fieldArray2 = useFieldArray({ control, name: `${basePath}.${pestañas[2] || 'tab2'}` });
  const fieldArray3 = useFieldArray({ control, name: `${basePath}.${pestañas[3] || 'tab3'}` });
  const fieldArray4 = useFieldArray({ control, name: `${basePath}.${pestañas[4] || 'tab4'}` });
  const fieldArray5 = useFieldArray({ control, name: `${basePath}.${pestañas[5] || 'tab5'}` });

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
  }, [pestañas, fieldArray0, fieldArray1, fieldArray2, fieldArray3, fieldArray4, fieldArray5, pestañaActiva]);

  // Observar cambios en el formulario
  const watchedValues = watch();

  // Emitir cambios al padre
  useEffect(() => {
    if (onChange && watchedValues?.[basePath]) {
      onChange(watchedValues[basePath]);
    }
  }, [watchedValues, onChange, basePath]);

  // Agregar nuevo campo
  const agregarCampo = (configuracion: ConfiguracionCampoHook) => {
    const camposActuales = getValues(`${basePath}.${pestañaActiva}`) || [];
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
    if (!fieldArray) {
      alert(`Error: No se puede agregar campo a la pestaña "${pestañaActiva}".`);
      return;
    }
    fieldArray.append(nuevoCampo);
  };

  // Eliminar campo
  const eliminarCampo = (index: number) => {
    const fieldArray = fieldArrays[pestañaActiva];
    if (!fieldArray) {
      return;
    }
    fieldArray.remove(index);
  };

  // Obtener el fieldArray de la pestaña activa
  const fieldArrayActivo = fieldArrays[pestañaActiva];
  const camposActuales = fieldArrayActivo?.fields || [];

  return (
    <div className={`w-full ${className}`}>
      {/* Navegación de Pestañas */}
      <TabNavigation
        pestañas={pestañas}
        pestañaActiva={pestañaActiva}
        onTabChange={setPestañaActiva}
        fieldArrays={fieldArrays}
      />

      {/* Contenido de la pestaña activa */}
      <div className="mt-6">
        {/* Campos existentes */}
        {camposActuales.length > 0 ? (
          <div className="space-y-4">
            {camposActuales.map((campo: CampoFormularioMejorado, index: number) => {
              const tipoConfigurado = tiposCamposPermitidos.find(config => config.tipo === campo.tipo);
              if (!tipoConfigurado) return null;

              return (
                <FieldRenderer
                  key={index}
                  campo={campo}
                  configuracion={tipoConfigurado}
                  index={index}
                  basePath={basePath}
                  pestañaActiva={pestañaActiva}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  onDelete={eliminarCampo}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState pestañaActiva={pestañaActiva} />
        )}

        {/* Botones para agregar campos */}
        <ActionButtons
          tiposCamposPermitidos={tiposCamposPermitidos}
          cantidadActual={camposActuales.length}
          cantidadMaxima={cantidadMaximaCampos}
          onAgregarCampo={agregarCampo}
        />

        {/* Información adicional */}
        <StatusInfo
          pestañaActiva={pestañaActiva}
          cantidadCampos={camposActuales.length}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default HookFormDinamico; 