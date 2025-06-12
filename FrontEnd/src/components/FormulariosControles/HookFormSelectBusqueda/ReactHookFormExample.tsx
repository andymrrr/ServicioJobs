import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import HookFormSelectBusqueda from './HookFormSelectBusqueda';

interface FormData {
  categoria: string;
  subcategoria: string;
  etiquetas: string[];
  prioridad: string;
}

/**
 * Ejemplo completo de integración con React-Hook-Form
 * Demuestra todas las funcionalidades de validación y manejo de estado
 */
export const ReactHookFormExample: React.FC = () => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid, isDirty }, 
    watch, 
    reset,
    setValue,
    getValues 
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      categoria: '',
      subcategoria: '',
      etiquetas: [],
      prioridad: 'media'
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('✅ Formulario válido enviado:', data);
    alert('¡Formulario enviado exitosamente! Revisa la consola.');
  };

  const onError = (errors: any) => {
    console.log('❌ Errores de validación:', errors);
    alert('Por favor corrige los errores del formulario.');
  };

  // Opciones dinámicas
  const categorias = [
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'diseno', label: 'Diseño' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'ventas', label: 'Ventas' },
  ];

  const subcategorias = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'devops', label: 'DevOps' },
  ];

  const etiquetas = [
    { value: 'react', label: 'React', color: '#61dafb' },
    { value: 'typescript', label: 'TypeScript', color: '#3178c6' },
    { value: 'nodejs', label: 'Node.js', color: '#339933' },
    { value: 'python', label: 'Python', color: '#3776ab' },
    { value: 'javascript', label: 'JavaScript', color: '#f7df1e' },
  ];

  const prioridades = [
    { value: 'baja', label: '🟢 Baja', description: 'No urgente' },
    { value: 'media', label: '🟡 Media', description: 'Importancia normal' },
    { value: 'alta', label: '🟠 Alta', description: 'Requiere atención' },
    { value: 'critica', label: '🔴 Crítica', description: 'Urgente' },
  ];

  // Validación personalizada para subcategoría
  const validateSubcategoria = (value: string) => {
    const categoria = getValues('categoria');
    if (categoria === 'tecnologia' && !value) {
      return 'La subcategoría es obligatoria para Tecnología';
    }
    return true;
  };

  // Handler personalizado para cambios
  const handleCategoriaChange = (value: string | string[]) => {
    const valorString = Array.isArray(value) ? value[0] : value;
    console.log('📂 Categoría cambiada a:', valorString);
    // Limpiar subcategoría cuando cambia la categoría
    setValue('subcategoria', '');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🪝 React-Hook-Form + HookFormSelectBusqueda
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Integración completa con validaciones, estado y control de formulario
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        
        {/* Estado del Formulario */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            📊 Estado del Formulario
          </h3>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <p>✅ Válido: {isValid ? 'Sí' : 'No'}</p>
            <p>📝 Modificado: {isDirty ? 'Sí' : 'No'}</p>
            <p>❌ Errores: {Object.keys(errors).length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Categoría con validación obligatoria */}
          <HookFormSelectBusqueda
            label="Categoría"
            name="categoria"
            control={control}
            errors={errors}
            options={categorias}
            placeholder="Selecciona una categoría..."
            variant="modern"
            size="lg"
            required="La categoría es obligatoria"
            tooltipMessage="Selecciona la categoría principal del proyecto"
            onChange={handleCategoriaChange}
            colSpan="12"
          />

          {/* Subcategoría con validación condicional */}
          <HookFormSelectBusqueda
            label="Subcategoría"
            name="subcategoria"
            control={control}
            errors={errors}
            options={subcategorias}
            placeholder="Selecciona una subcategoría..."
            variant="icon"
            validate={validateSubcategoria}
            tooltipMessage="Subcategoría específica (obligatoria para Tecnología)"
            colSpan="12"
          />

        </div>

        {/* Multi-selección de etiquetas */}
        <HookFormSelectBusqueda
          label="Etiquetas Técnicas"
          name="etiquetas"
          control={control}
          errors={errors}
          options={etiquetas}
          placeholder="Selecciona múltiples tecnologías..."
          variant="modern"
          isMulti={true}
          isClearable={true}
          isSearchable={true}
          tooltipMessage="Puedes seleccionar múltiples tecnologías"
          validate={(value) => {
            if (!value || value.length === 0) {
              return 'Selecciona al menos una etiqueta';
            }
            if (value.length > 3) {
              return 'Máximo 3 etiquetas permitidas';
            }
            return true;
          }}
          colSpan="12"
        />

        {/* Prioridad con valor por defecto */}
        <HookFormSelectBusqueda
          label="Nivel de Prioridad"
          name="prioridad"
          control={control}
          errors={errors}
          options={prioridades}
          variant="compact"
          size="md"
          required="Selecciona el nivel de prioridad"
          tooltipMessage="Nivel de importancia del proyecto"
          colSpan="12"
        />

        {/* Controles del formulario */}
        <div className="flex flex-wrap gap-4 pt-6">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isValid 
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isValid ? '✅ Enviar Formulario' : '❌ Completa los campos'}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            🔄 Resetear Formulario
          </button>

          <button
            type="button"
            onClick={() => {
              setValue('categoria', 'tecnologia');
              setValue('subcategoria', 'frontend');
              setValue('etiquetas', ['react', 'typescript']);
              setValue('prioridad', 'alta');
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            📋 Llenar Ejemplo
          </button>
        </div>

        {/* Valores en tiempo real */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">🔍 Valores en Tiempo Real:</h3>
          <pre className="text-sm text-gray-600 dark:text-gray-400 overflow-x-auto bg-white dark:bg-gray-800 p-3 rounded">
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </div>

        {/* Errores de validación */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              ❌ Errores de Validación:
            </h3>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>
                  <strong>{field}:</strong> {error?.message as string}
                </li>
              ))}
            </ul>
          </div>
        )}

      </form>
    </div>
  );
};

export default ReactHookFormExample; 