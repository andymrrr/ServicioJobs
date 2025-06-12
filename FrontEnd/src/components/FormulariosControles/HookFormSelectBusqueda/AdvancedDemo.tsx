import React from 'react';
import { useForm } from 'react-hook-form';
import HookFormSelectBusqueda from './HookFormSelectBusqueda';

interface FormData {
  basicSelect: string;
  modernSelect: string;
  iconSelect: string;
  multiSelect: string[];
}

/**
 * Demostración básica del HookFormSelectBusqueda
 */
export const AdvancedDemo: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      basicSelect: '',
      modernSelect: '',
      iconSelect: '',
      multiSelect: [],
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('📋 Datos del formulario:', data);
    alert('¡Revisa la consola para ver los datos!');
  };

  // Opciones básicas
  const basicOptions = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
    { value: 'option4', label: 'Opción 4' },
  ];

  // Opciones con colores
  const colorOptions = [
    { 
      value: 'red', 
      label: 'Rojo', 
      color: '#ef4444',
      description: 'Color cálido'
    },
    { 
      value: 'blue', 
      label: 'Azul', 
      color: '#3b82f6',
      description: 'Color frío'
    },
    { 
      value: 'green', 
      label: 'Verde', 
      color: '#10b981',
      description: 'Color natural'
    },
  ];

  // Icono simple
  const UserIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🔍 HookFormSelectBusqueda Demo
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Componente de select mejorado con múltiples variantes
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
        
        {/* Variante Básica */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">🎯 Select Básico</h3>
            <HookFormSelectBusqueda
              label="Select Básico"
              name="basicSelect"
              control={control}
              errors={errors}
              options={basicOptions}
              placeholder="Elige una opción..."
              variant="basic"
              required="Este campo es obligatorio"
              tooltipMessage="Variante básica con validación"
              colSpan="12"
            />
          </div>
        </div>

        {/* Variante Moderna */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-purple-600">✨ Select Moderno</h3>
            <HookFormSelectBusqueda
              label="Select Moderno"
              name="modernSelect"
              control={control}
              errors={errors}
              options={colorOptions}
              variant="modern"
              size="lg"
              tooltipMessage="Variante moderna con colores"
              colSpan="12"
            />
          </div>
        </div>

        {/* Variante con Icono */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-green-600">🎨 Select con Icono</h3>
            <HookFormSelectBusqueda
              label="Select con Icono"
              name="iconSelect"
              control={control}
              errors={errors}
              options={basicOptions}
              icon={<UserIcon />}
              variant="icon"
              size="md"
              tooltipMessage="Select con icono personalizado"
              colSpan="12"
            />
          </div>
        </div>

        {/* Multi-selección */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">🔢 Multi-selección</h3>
            <HookFormSelectBusqueda
              label="Select Múltiple"
              name="multiSelect"
              control={control}
              errors={errors}
              options={colorOptions}
              isMulti={true}
              variant="modern"
              placeholder="Selecciona múltiples opciones..."
              tooltipMessage="Permite seleccionar múltiples opciones"
              colSpan="12"
            />
          </div>
        </div>

        {/* Botón de envío */}
        <div className="col-span-12 text-center pt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            🚀 Ver Datos del Formulario
          </button>
        </div>

        {/* Valores actuales */}
        <div className="col-span-12">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📊 Valores Actuales:</h4>
            <pre className="text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
              {JSON.stringify(watch(), null, 2)}
            </pre>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdvancedDemo; 