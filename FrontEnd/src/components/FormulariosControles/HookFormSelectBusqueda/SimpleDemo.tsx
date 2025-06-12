import React from 'react';
import { useForm } from 'react-hook-form';
import HookFormSelectBusqueda from './HookFormSelectBusqueda';

interface DemoFormData {
  basicSelect: string;
  modernSelect: string;
  multiSelect: string[];
}

/**
 * Demostración simple y funcional del HookFormSelectBusqueda
 */
export const SimpleDemo: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<DemoFormData>({
    defaultValues: {
      basicSelect: '',
      modernSelect: '',
      multiSelect: [],
    }
  });

  const onSubmit = (data: DemoFormData) => {
    console.log('✅ Datos enviados:', data);
    alert('¡Datos enviados! Revisa la consola.');
  };

  // Opciones básicas
  const basicOptions = [
    { value: 'opt1', label: 'Primera Opción' },
    { value: 'opt2', label: 'Segunda Opción' },
    { value: 'opt3', label: 'Tercera Opción' },
  ];

  const colorOptions = [
    { value: 'red', label: 'Rojo', color: '#ef4444' },
    { value: 'blue', label: 'Azul', color: '#3b82f6' },
    { value: 'green', label: 'Verde', color: '#10b981' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">🔍 HookFormSelectBusqueda</h1>
        <p className="text-gray-600">Demostración funcional del componente mejorado</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Select Básico */}
        <div className="grid grid-cols-12 gap-4">
          <HookFormSelectBusqueda
            label="Select Básico"
            name="basicSelect"
            control={control}
            errors={errors}
            options={basicOptions}
            placeholder="Selecciona una opción..."
            variant="basic"
            required="Este campo es requerido"
            colSpan="6"
          />

          <HookFormSelectBusqueda
            label="Select Moderno"
            name="modernSelect"
            control={control}
            errors={errors}
            options={colorOptions}
            placeholder="Elige un color..."
            variant="modern"
            size="lg"
            colSpan="6"
          />
        </div>

        {/* Multi Select */}
        <div className="grid grid-cols-12 gap-4">
          <HookFormSelectBusqueda
            label="Multi Selección"
            name="multiSelect"
            control={control}
            errors={errors}
            options={basicOptions}
            placeholder="Selecciona múltiples..."
            variant="modern"
            isMulti={true}
            colSpan="12"
          />
        </div>

        {/* Botón Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Enviar Formulario
          </button>
        </div>

        {/* Valores Actuales */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Valores Actuales:</h3>
          <pre className="text-sm text-gray-600 overflow-x-auto">
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </div>
      </form>
    </div>
  );
};

export default SimpleDemo; 