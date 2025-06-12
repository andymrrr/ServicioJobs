import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMapPin, FiBriefcase, FiSettings, FiClock } from 'react-icons/fi';
import HookFormSelect, { SelectOption, SelectGroup } from './index';

interface AdvancedFormData {
  departamento: string;
  ubicacion: string;
  experiencia: string;
  modalidad: string;
  horario: string;
}

const AdvancedDemo: React.FC = () => {
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AdvancedFormData>({
    defaultValues: {
      departamento: '',
      ubicacion: '',
      experiencia: '',
      modalidad: '',
      horario: ''
    }
  });

  // Simular carga asíncrona de departamentos
  const simulateLoadingDepartments = () => {
    setLoadingDepartments(true);
    setTimeout(() => {
      setLoadingDepartments(false);
    }, 2000);
  };

  // Simular carga asíncrona de ubicaciones
  const simulateLoadingLocations = () => {
    setLoadingLocations(true);
    setTimeout(() => {
      setLoadingLocations(false);
    }, 1500);
  };

  // Opciones agrupadas para departamentos
  const departmentGroups: SelectGroup[] = [
    {
      label: 'Tecnología',
      options: [
        { value: 'frontend', label: 'Frontend Developer', description: 'React, Vue, Angular' },
        { value: 'backend', label: 'Backend Developer', description: 'Node.js, Python, Java' },
        { value: 'fullstack', label: 'Fullstack Developer', description: 'Frontend + Backend' },
        { value: 'devops', label: 'DevOps Engineer', description: 'AWS, Docker, Kubernetes' }
      ]
    },
    {
      label: 'Diseño',
      options: [
        { value: 'ux', label: 'UX Designer', description: 'Experiencia de usuario', color: 'purple' },
        { value: 'ui', label: 'UI Designer', description: 'Interfaz de usuario', color: 'blue' },
        { value: 'graphic', label: 'Graphic Designer', description: 'Diseño gráfico', color: 'green' }
      ]
    },
    {
      label: 'Marketing',
      options: [
        { value: 'digital', label: 'Marketing Digital', description: 'SEO, SEM, Social Media' },
        { value: 'content', label: 'Content Marketing', description: 'Creación de contenido' },
        { value: 'growth', label: 'Growth Hacker', description: 'Crecimiento de usuario' }
      ]
    }
  ];

  // Opciones con estados especiales
  const ubicacionOptions: SelectOption[] = [
    { value: 'madrid', label: 'Madrid, España', description: 'Oficina central' },
    { value: 'barcelona', label: 'Barcelona, España', description: 'Oficina regional' },
    { value: 'valencia', label: 'Valencia, España', description: 'Nueva oficina', color: 'green' },
    { value: 'sevilla', label: 'Sevilla, España', disabled: true, description: 'Próximamente' },
    { value: 'mexico', label: 'Ciudad de México', description: 'Oficina LATAM' },
    { value: 'buenos-aires', label: 'Buenos Aires, Argentina', description: 'Oficina regional' },
    { value: 'remote', label: 'Remoto 100%', description: 'Trabajo completamente remoto', color: 'blue' }
  ];

  const experienciaOptions: SelectOption[] = [
    { value: 'junior', label: 'Junior (0-2 años)', description: 'Nivel de entrada' },
    { value: 'mid', label: 'Mid Level (2-5 años)', description: 'Experiencia intermedia' },
    { value: 'senior', label: 'Senior (5+ años)', description: 'Experiencia avanzada' },
    { value: 'lead', label: 'Tech Lead (7+ años)', description: 'Liderazgo técnico' },
    { value: 'principal', label: 'Principal (10+ años)', description: 'Arquitecto/Consultor', color: 'gold' }
  ];

  const modalidadOptions: SelectOption[] = [
    { value: 'presencial', label: 'Presencial', description: '100% en oficina' },
    { value: 'remoto', label: 'Remoto', description: '100% desde casa', color: 'blue' },
    { value: 'hibrido', label: 'Híbrido', description: 'Combinación presencial/remoto', color: 'purple' },
    { value: 'flexible', label: 'Flexible', description: 'Tú decides', color: 'green' }
  ];

  const horarioOptions: SelectOption[] = [
    { value: 'completo', label: 'Tiempo Completo', description: '40 horas/semana' },
    { value: 'parcial', label: 'Tiempo Parcial', description: '20-30 horas/semana' },
    { value: 'freelance', label: 'Freelance', description: 'Por proyecto' },
    { value: 'consultoria', label: 'Consultoría', description: 'Por horas', disabled: true }
  ];

  const onSubmit = (data: AdvancedFormData) => {
    console.log('Datos del formulario avanzado:', data);
    alert('Formulario enviado. Ver consola para más detalles.');
  };

  const watchedValues = watch();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          HookFormSelect - Demostración Avanzada
        </h1>

        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Funcionalidades Demostradas:
          </h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Opciones agrupadas por categorías</li>
            <li>• Estados de carga asíncrona</li>
            <li>• Opciones con descripciones y colores</li>
            <li>• Opciones deshabilitadas</li>
            <li>• Múltiples variantes visuales</li>
            <li>• Diferentes tamaños</li>
            <li>• Botón de limpieza opcional</li>
            <li>• Validaciones personalizadas</li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Select con opciones agrupadas */}
            <div className="col-span-12">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Selects con Opciones Agrupadas
              </h2>
            </div>

            <HookFormSelect
              name="departamento"
              label="Departamento (Opciones Agrupadas)"
              groups={departmentGroups}
              register={register}
              errors={errors}
              selectedValue={watchedValues.departamento}
              onChange={(value) => setValue('departamento', value)}
              placeholder="Selecciona un departamento..."
              variant="modern"
              size="lg"
              icon={<FiBriefcase />}
              colSpan="6"
              clearable
              loading={loadingDepartments}
              loadingMessage="Cargando departamentos..."
              tooltipMessage="Selecciona el departamento al que te postulas"
              required="El departamento es obligatorio"
            />

            <HookFormSelect
              name="ubicacion"
              label="Ubicación (Con Estados Especiales)"
              options={ubicacionOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.ubicacion}
              onChange={(value) => setValue('ubicacion', value)}
              placeholder="Selecciona una ubicación..."
              variant="outlined"
              size="md"
              icon={<FiMapPin />}
              colSpan="6"
              clearable
              loading={loadingLocations}
              loadingMessage="Cargando ubicaciones..."
              tooltipMessage="Algunas ubicaciones pueden no estar disponibles"
            />

            {/* Selects con diferentes configuraciones */}
            <div className="col-span-12 mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Diferentes Configuraciones
              </h2>
            </div>

            <HookFormSelect
              name="experiencia"
              label="Nivel de Experiencia (Filled + SM)"
              options={experienciaOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.experiencia}
              onChange={(value) => setValue('experiencia', value)}
              placeholder="Selecciona tu nivel..."
              variant="filled"
              size="sm"
              icon={<FiUser />}
              colSpan="4"
              validate={(value) => {
                if (value === 'principal' && !watchedValues.departamento) {
                  return 'Para nivel Principal, debes seleccionar un departamento primero';
                }
                return true;
              }}
            />

            <HookFormSelect
              name="modalidad"
              label="Modalidad de Trabajo (Minimal + LG)"
              options={modalidadOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.modalidad}
              onChange={(value) => setValue('modalidad', value)}
              placeholder="Selecciona modalidad..."
              variant="minimal"
              size="lg"
              icon={<FiSettings />}
              colSpan="4"
              clearable
              tooltipMessage="El trabajo remoto requiere experiencia previa"
            />

            <HookFormSelect
              name="horario"
              label="Tipo de Horario (Basic + MD)"
              options={horarioOptions}
              register={register}
              errors={errors}
              selectedValue={watchedValues.horario}
              onChange={(value) => setValue('horario', value)}
              placeholder="Selecciona horario..."
              variant="basic"
              size="md"
              icon={<FiClock />}
              colSpan="4"
              emptyMessage="No hay opciones de horario disponibles"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Enviar Aplicación
            </button>
            
            <button
              type="button"
              onClick={() => {
                setValue('departamento', '');
                setValue('ubicacion', '');
                setValue('experiencia', '');
                setValue('modalidad', '');
                setValue('horario', '');
              }}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              Limpiar Formulario
            </button>

            <button
              type="button"
              onClick={simulateLoadingDepartments}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors font-medium"
              disabled={loadingDepartments}
            >
              {loadingDepartments ? 'Cargando...' : 'Simular Carga Departamentos'}
            </button>

            <button
              type="button"
              onClick={simulateLoadingLocations}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
              disabled={loadingLocations}
            >
              {loadingLocations ? 'Cargando...' : 'Simular Carga Ubicaciones'}
            </button>
          </div>

          {/* Vista previa de datos */}
          <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Vista Previa de Datos del Formulario:
            </h3>
            <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </div>

          {/* Información sobre validaciones */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
            <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Validaciones Activas:
            </h4>
            <ul className="text-amber-700 dark:text-amber-300 space-y-1">
              <li>• <strong>Departamento:</strong> Campo obligatorio</li>
              <li>• <strong>Experiencia:</strong> Si seleccionas "Principal", debes elegir un departamento primero</li>
              <li>• Las opciones deshabilitadas no se pueden seleccionar</li>
              <li>• Los tooltips proporcionan información adicional</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedDemo; 