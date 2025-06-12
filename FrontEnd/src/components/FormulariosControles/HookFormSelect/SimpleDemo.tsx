import React from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMapPin, FiStar } from 'react-icons/fi';
import HookFormSelect, { SelectOption } from './index';

interface FormData {
  pais: string;
  ciudad: string;
  categoria: string;
  prioridad: string;
  estado: string;
}

const SimpleDemo: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      pais: '',
      ciudad: '',
      categoria: '',
      prioridad: '',
      estado: ''
    }
  });

  // Opciones de ejemplo
  const paisesOptions: SelectOption[] = [
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' },
    { value: 'pe', label: 'Perú' }
  ];

  const ciudadesOptions: SelectOption[] = [
    { value: 'mad', label: 'Madrid', description: 'Capital de España' },
    { value: 'bcn', label: 'Barcelona', description: 'Ciudad condal' },
    { value: 'cdmx', label: 'Ciudad de México', description: 'Capital de México' },
    { value: 'ba', label: 'Buenos Aires', description: 'Capital de Argentina' }
  ];

  const categoriaOptions: SelectOption[] = [
    { value: 'tec', label: 'Tecnología', color: 'blue' },
    { value: 'des', label: 'Diseño', color: 'purple' },
    { value: 'mkt', label: 'Marketing', color: 'green' },
    { value: 'ven', label: 'Ventas', color: 'orange' }
  ];

  const prioridadOptions: SelectOption[] = [
    { value: 'baja', label: 'Baja' },
    { value: 'media', label: 'Media' },
    { value: 'alta', label: 'Alta' },
    { value: 'critica', label: 'Crítica', disabled: true }
  ];

  const estadoOptions: SelectOption[] = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'progreso', label: 'En Progreso' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const onSubmit = (data: FormData) => {
    console.log('Datos del formulario:', data);
    alert('Formulario enviado. Ver consola para más detalles.');
  };

  // Obtener valores actuales
  const watchedValues = watch();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          HookFormSelect - Demostración Simple
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sección de Variantes Básicas */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Variantes Básicas
              </h2>
            </div>

            {/* Basic Variant */}
            <HookFormSelect
              name="pais"
              label="País (Basic)"
              options={paisesOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.pais}
              onChange={(value) => setValue('pais', value)}
              placeholder="Selecciona un país..."
              variant="basic"
              colSpan="6"
              required="Por favor selecciona un país"
            />

            {/* Modern Variant */}
            <HookFormSelect
              name="ciudad"
              label="Ciudad (Modern)"
              options={ciudadesOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.ciudad}
              onChange={(value) => setValue('ciudad', value)}
              placeholder="Selecciona una ciudad..."
              variant="modern"
              icon={<FiMapPin />}
              colSpan="6"
              clearable
              tooltipMessage="Selecciona la ciudad donde te encuentras"
            />

            {/* Outlined Variant */}
            <HookFormSelect
              name="categoria"
              label="Categoría (Outlined)"
              options={categoriaOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.categoria}
              onChange={(value) => setValue('categoria', value)}
              placeholder="Selecciona una categoría..."
              variant="outlined"
              icon={<FiUser />}
              colSpan="4"
              size="lg"
            />

            {/* Filled Variant */}
            <HookFormSelect
              name="prioridad"
              label="Prioridad (Filled)"
              options={prioridadOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.prioridad}
              onChange={(value) => setValue('prioridad', value)}
              placeholder="Selecciona la prioridad..."
              variant="filled"
              icon={<FiStar />}
              colSpan="4"
              size="sm"
            />

            {/* Minimal Variant */}
            <HookFormSelect
              name="estado"
              label="Estado (Minimal)"
              options={estadoOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.estado}
              onChange={(value) => setValue('estado', value)}
              placeholder="Selecciona el estado..."
              variant="minimal"
              colSpan="4"
              clearable
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Enviar Formulario
            </button>
            <button
              type="button"
              onClick={() => {
                setValue('pais', '');
                setValue('ciudad', '');
                setValue('categoria', '');
                setValue('prioridad', '');
                setValue('estado', '');
              }}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Limpiar Todo
            </button>
          </div>

          {/* Vista previa de datos */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Vista Previa de Datos:
            </h3>
            <pre className="text-sm text-gray-600 dark:text-gray-300">
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleDemo; 