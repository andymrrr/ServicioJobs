import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiUser, FiMapPin, FiBriefcase } from 'react-icons/fi';
import HookFormSelect, { SelectOption, SelectGroup } from './index';

interface FormData {
  pais: string;
  ciudad: string;
  profesion: string;
  experiencia: string;
  modalidad: string;
}

const ReactHookFormExample: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    control,
    formState: { errors, isSubmitting, isValid },
    reset
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      pais: '',
      ciudad: '',
      profesion: '',
      experiencia: '',
      modalidad: ''
    }
  });

  const paisesOptions: SelectOption[] = [
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' }
  ];

  const ciudadesOptions: SelectOption[] = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'cdmx', label: 'Ciudad de México' },
    { value: 'bogota', label: 'Bogotá' }
  ];

  const profesionGroups: SelectGroup[] = [
    {
      label: 'Tecnología',
      options: [
        { value: 'frontend', label: 'Frontend Developer' },
        { value: 'backend', label: 'Backend Developer' },
        { value: 'fullstack', label: 'Fullstack Developer' }
      ]
    },
    {
      label: 'Diseño',
      options: [
        { value: 'ux', label: 'UX Designer' },
        { value: 'ui', label: 'UI Designer' }
      ]
    }
  ];

  const experienciaOptions: SelectOption[] = [
    { value: 'junior', label: 'Junior (0-2 años)' },
    { value: 'mid', label: 'Mid Level (2-5 años)' },
    { value: 'senior', label: 'Senior (5+ años)' }
  ];

  const modalidadOptions: SelectOption[] = [
    { value: 'presencial', label: 'Presencial' },
    { value: 'remoto', label: 'Remoto' },
    { value: 'hibrido', label: 'Híbrido' }
  ];

  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    console.log('Datos del formulario:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Formulario enviado exitosamente!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          HookFormSelect - React Hook Form
        </h1>

        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            ✅ Integración Completa con React Hook Form
          </h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1">
            <li>• register, watch, setValue, Controller</li>
            <li>• Validaciones y manejo de errores</li>
            <li>• Estados: isSubmitting, isValid</li>
            <li>• Todas las funcionalidades funcionando</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <HookFormSelect
              name="pais"
              label="País"
              options={paisesOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.pais}
              onChange={(value) => setValue('pais', value)}
              placeholder="Selecciona tu país..."
              variant="modern"
              icon={<FiMapPin />}
              colSpan="6"
              clearable
              required="El país es obligatorio"
            />

            <HookFormSelect
              name="ciudad"
              label="Ciudad"
              options={ciudadesOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.ciudad}
              onChange={(value) => setValue('ciudad', value)}
              placeholder="Selecciona tu ciudad..."
              variant="outlined"
              icon={<FiMapPin />}
              colSpan="6"
              clearable
              disabled={!watchedValues.pais}
            />

            <HookFormSelect
              name="profesion"
              label="Profesión"
              groups={profesionGroups}
              register={register}
              errors={errors}
              selectedValue={watchedValues.profesion}
              onChange={(value) => setValue('profesion', value)}
              placeholder="Selecciona tu profesión..."
              variant="filled"
              icon={<FiBriefcase />}
              colSpan="12"
              clearable
              required="La profesión es obligatoria"
            />

            <HookFormSelect
              name="experiencia"
              label="Experiencia"
              options={experienciaOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.experiencia}
              onChange={(value) => setValue('experiencia', value)}
              placeholder="Selecciona tu nivel..."
              variant="basic"
              icon={<FiUser />}
              colSpan="6"
              required="La experiencia es obligatoria"
            />

            <HookFormSelect
              name="modalidad"
              label="Modalidad"
              options={modalidadOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.modalidad}
              onChange={(value) => setValue('modalidad', value)}
              placeholder="Selecciona modalidad..."
              variant="minimal"
              colSpan="6"
              clearable
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isSubmitting || !isValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
            >
              Reset
            </button>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isValid 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {isValid ? '✅ Válido' : '❌ Inválido'}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Datos en Tiempo Real:
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

export default ReactHookFormExample; 