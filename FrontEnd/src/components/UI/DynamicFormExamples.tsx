import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import HookFormDinamico, { ConfiguracionCampoHook, FormularioTabData } from '../FormulariosControles/React-Hook-Form/HookFormDinamico/HookFormDinamico';

// Estructura de datos para React Hook Form
interface FormData {
  tabs: {
    [key: string]: any[];
  };
}


const DynamicFormExamples: React.FC = () => {
  const [ejemploActivo, setEjemploActivo] = useState('api');

  // Configurar React Hook Form
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
    defaultValues: { tabs: {} },
    mode: 'onChange'
  });

  // 🌐 EJEMPLO 1: CONFIGURADOR DE APIs
  const configuracionAPI: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Header/Parámetro',
      tamaño: '6',
      placeholder: 'Authorization, Content-Type, limit, etc.',
      required: true,
      requiredMessage: 'El nombre es requerido',
      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
    },
    {
      tipo: 'input',
      label: 'Valor',
      tamaño: '6',
      placeholder: 'Bearer token, application/json, 10, etc.',
      required: true,
      requiredMessage: 'El valor es requerido'
    },
    {
      tipo: 'select',
      label: 'Tipo de Auth',
      tamaño: '4',
      opciones: [
        { valor: 'bearer', etiqueta: 'Bearer Token' },
        { valor: 'basic', etiqueta: 'Basic Auth' },
        { valor: 'apikey', etiqueta: 'API Key' },
        { valor: 'oauth', etiqueta: 'OAuth 2.0' }
      ]
    },
    {
      tipo: 'checkbox',
      label: 'Activo',
      tamaño: '2'
    }
  ];

  // 📝 EJEMPLO 2: CONSTRUCTOR DE FORMULARIOS
  const configuracionFormulario: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Etiqueta del Campo',
      tamaño: '6',
      placeholder: 'Nombre, Email, Teléfono...',
      required: true,
      requiredMessage: 'La etiqueta del campo es obligatoria'
    },
    {
      tipo: 'select',
      label: 'Tipo de Campo',
      tamaño: '4',
      required: true,
      opciones: [
        { valor: 'text', etiqueta: 'Texto' },
        { valor: 'email', etiqueta: 'Email' },
        { valor: 'tel', etiqueta: 'Teléfono' },
        { valor: 'number', etiqueta: 'Número' },
        { valor: 'date', etiqueta: 'Fecha' },
        { valor: 'textarea', etiqueta: 'Área de Texto' }
      ]
    },
    {
      tipo: 'textarea',
      label: 'Placeholder/Ayuda',
      tamaño: '8',
      placeholder: 'Texto de ayuda para el usuario...',
      maxLength: { value: 200, message: 'Máximo 200 caracteres' }
    },
    {
      tipo: 'checkbox',
      label: 'Campo Obligatorio',
      tamaño: '3'
    }
  ];

  // 🛍️ EJEMPLO 3: CONFIGURADOR DE PRODUCTOS
  const configuracionProducto: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Nombre Atributo',
      tamaño: '5',
      placeholder: 'Color, Tamaño, Peso, Dimensiones...',
      required: true,
      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
    },
    {
      tipo: 'select',
      label: 'Tipo de Dato',
      tamaño: '3',
      required: true,
      opciones: [
        { valor: 'string', etiqueta: 'Texto' },
        { valor: 'number', etiqueta: 'Número' },
        { valor: 'boolean', etiqueta: 'Sí/No' },
        { valor: 'list', etiqueta: 'Lista de opciones' },
        { valor: 'range', etiqueta: 'Rango numérico' }
      ]
    },
    {
      tipo: 'select',
      label: 'Categoría',
      tamaño: '4',
      required: true,
      opciones: [
        { valor: 'fisico', etiqueta: 'Atributo Físico' },
        { valor: 'tecnico', etiqueta: 'Especificación Técnica' },
        { valor: 'comercial', etiqueta: 'Información Comercial' },
        { valor: 'logistico', etiqueta: 'Datos Logísticos' }
      ]
    }
  ];

  // 📊 EJEMPLO 4: GENERADOR DE ENCUESTAS
  const configuracionEncuesta: ConfiguracionCampoHook[] = [
    {
      tipo: 'textarea',
      label: 'Pregunta',
      tamaño: '8',
      placeholder: '¿Cuál es tu opinión sobre nuestro servicio?',
      required: true,
      maxLength: { value: 300, message: 'Máximo 300 caracteres' }
    },
    {
      tipo: 'select',
      label: 'Tipo de Respuesta',
      tamaño: '4',
      required: true,
      opciones: [
        { valor: 'texto_corto', etiqueta: 'Texto Corto' },
        { valor: 'texto_largo', etiqueta: 'Texto Largo' },
        { valor: 'opcion_unica', etiqueta: 'Opción Única' },
        { valor: 'opcion_multiple', etiqueta: 'Opción Múltiple' },
        { valor: 'escala_1_5', etiqueta: 'Escala 1-5' },
        { valor: 'si_no', etiqueta: 'Sí/No' }
      ]
    },
    {
      tipo: 'checkbox',
      label: 'Pregunta Obligatoria',
      tamaño: '2'
    }
  ];

  // 🔍 EJEMPLO 5: CONFIGURADOR DE FILTROS
  const configuracionFiltros: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Campo de la BD',
      tamaño: '4',
      placeholder: 'precio, fecha_creacion, categoria_id...',
      required: true,
      pattern: {
        value: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
        message: 'Solo letras, números y guiones bajos'
      }
    },
    {
      tipo: 'input',
      label: 'Etiqueta Visible',
      tamaño: '4',
      placeholder: 'Precio, Fecha de Creación, Categoría...',
      required: true
    },
    {
      tipo: 'select',
      label: 'Operador',
      tamaño: '2',
      required: true,
      opciones: [
        { valor: '=', etiqueta: 'Igual (=)' },
        { valor: '!=', etiqueta: 'Diferente (!=)' },
        { valor: '>', etiqueta: 'Mayor (>)' },
        { valor: '<', etiqueta: 'Menor (<)' },
        { valor: 'like', etiqueta: 'Contiene (LIKE)' },
        { valor: 'in', etiqueta: 'En lista (IN)' }
      ]
    },
    {
      tipo: 'select',
      label: 'Tipo de Control',
      tamaño: '2',
      opciones: [
        { valor: 'input', etiqueta: 'Campo de Texto' },
        { valor: 'select', etiqueta: 'Lista Desplegable' },
        { valor: 'checkbox', etiqueta: 'Casilla de Verificación' },
        { valor: 'date', etiqueta: 'Selector de Fecha' },
        { valor: 'range', etiqueta: 'Rango Numérico' }
      ]
    }
  ];

  // ⚙️ EJEMPLO 6: PANEL DE CONFIGURACIÓN
  const configuracionPanel: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Variable de Entorno',
      tamaño: '4',
      placeholder: 'DATABASE_URL, API_KEY, PORT...',
      required: true,
      pattern: {
        value: /^[A-Z_][A-Z0-9_]*$/,
        message: 'Solo mayúsculas, números y guiones bajos'
      }
    },
    {
      tipo: 'input',
      label: 'Valor',
      tamaño: '6',
      placeholder: 'localhost:5432, abc123, 3000...',
      required: true
    },
    {
      tipo: 'select',
      label: 'Tipo de Dato',
      tamaño: '2',
      opciones: [
        { valor: 'string', etiqueta: 'Texto' },
        { valor: 'number', etiqueta: 'Número' },
        { valor: 'boolean', etiqueta: 'Booleano' },
        { valor: 'json', etiqueta: 'JSON' }
      ]
    }
  ];

  const ejemplos = {
    api: {
      title: '🌐 Configurador de APIs REST',
      description: 'Configura headers, query params, request body y autenticación para APIs REST de forma dinámica.',
      pestañas: ['Headers', 'Query Params', 'Request Body', 'Authentication'],
      config: configuracionAPI,
      valoresIniciales: {
        'Headers': [
          { nombre: 'Content-Type', valor: 'application/json', tipo: 'input' as const },
          { nombre: 'Accept', valor: 'application/json', tipo: 'input' as const }
        ]
      }
    },
    formulario: {
      title: '📝 Constructor de Formularios',
      description: 'Crea formularios dinámicos definiendo campos personalizados, tipos de input y validaciones.',
      pestañas: ['Campos Basicos', 'Campos Avanzados', 'Validaciones'],
      config: configuracionFormulario,
      valoresIniciales: {
        'Campos Basicos': [
          { nombre: 'Nombre Completo', valor: 'text', tipo: 'input' as const },
          { nombre: 'Email', valor: 'email', tipo: 'input' as const }
        ]
      }
    },
    producto: {
      title: '🛍️ Configurador de Productos',
      description: 'Define características físicas, especificaciones técnicas y atributos comerciales de productos.',
      pestañas: ['Caracteristicas Fisicas', 'Especificaciones Tecnicas', 'Info Comercial'],
      config: configuracionProducto,
      valoresIniciales: {
        'Caracteristicas Fisicas': [
          { nombre: 'Color', valor: 'Azul, Rojo, Verde', tipo: 'input' as const },
          { nombre: 'Peso', valor: '1.5', tipo: 'input' as const }
        ]
      }
    },
    encuesta: {
      title: '📊 Generador de Encuestas',
      description: 'Construye encuestas y cuestionarios con diferentes tipos de preguntas y opciones de respuesta.',
      pestañas: ['Preguntas Basicas', 'Preguntas Multiple', 'Escalas Valoracion'],
      config: configuracionEncuesta,
      valoresIniciales: {
        'Preguntas Basicas': [
          { nombre: '¿Cómo calificarías nuestro servicio?', valor: 'escala_1_5', tipo: 'textarea' as const }
        ]
      }
    },
    filtros: {
      title: '🔍 Configurador de Filtros de Búsqueda',
      description: 'Define filtros dinámicos para bases de datos con operadores y tipos de control personalizables.',
      pestañas: ['Filtros Basicos', 'Filtros Avanzados', 'Filtros de Fecha'],
      config: configuracionFiltros,
      valoresIniciales: {
        'Filtros Basicos': [
          { nombre: 'precio', valor: 'Precio', tipo: 'input' as const }
        ]
      }
    },
    configuracion: {
      title: '⚙️ Panel de Configuración de Sistema',
      description: 'Gestiona variables de entorno, configuraciones de aplicación y parámetros del sistema.',
      pestañas: ['Variables Entorno', 'Configuracion BD', 'APIs Externas'],
      config: configuracionPanel,
      valoresIniciales: {
        'Variables Entorno': [
          { nombre: 'DATABASE_URL', valor: 'postgresql://localhost:5432/mydb', tipo: 'input' as const }
        ]
      }
    }
  };

  const ejemploSeleccionado = ejemplos[ejemploActivo as keyof typeof ejemplos];

  const manejarEnvio = handleSubmit((data) => {
    // Procesar datos según el tipo de ejemplo
    const datosProcesados = Object.entries(data.tabs).reduce((acc, [pestaña, campos]) => {
      acc[pestaña] = campos.map(campo => ({
        ...campo // Incluir todas las propiedades del campo
      }));
      return acc;
    }, {} as any);
    
    alert(`¡${ejemploSeleccionado.title} procesado correctamente! 🎉\n\nLos datos han sido procesados exitosamente.`);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 Dynamic Form Examples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Descubre la versatilidad del componente <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">DynamicFieldFormHookImproved</code> con estos 
            <strong> 6 ejemplos reales</strong> que puedes implementar inmediatamente.
          </p>
        </div>

        {/* Selector de Ejemplos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🎯 Selecciona un Caso de Uso
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ejemplos).map(([key, ejemplo]) => (
              <button
                key={key}
                onClick={() => setEjemploActivo(key)}
                className={`group p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:-translate-y-1 ${
                  ejemploActivo === key
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400'
                }`}
              >
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ejemplo.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {ejemplo.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {ejemplo.pestañas.slice(0, 3).map((pestaña, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                    >
                      {pestaña}
                    </span>
                  ))}
                  {ejemplo.pestañas.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      +{ejemplo.pestañas.length - 3} más
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ejemplo Activo */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">
              {ejemploSeleccionado.title}
            </h2>
            <p className="text-blue-100 text-lg opacity-90">
              {ejemploSeleccionado.description}
            </p>
            
            {/* Badges con pestañas */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm font-medium text-blue-200">Pestañas disponibles:</span>
              {ejemploSeleccionado.pestañas.map((pestaña, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur"
                >
                  {pestaña}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={manejarEnvio}>
              <HookFormDinamico
                pestañas={ejemploSeleccionado.pestañas}
                tiposCamposPermitidos={ejemploSeleccionado.config}
                cantidadMaximaCampos={25}
                valoresIniciales={ejemploSeleccionado.valoresIniciales}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-6"
                // Props de React Hook Form
                control={control}
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
              />
              
              {/* Botón de envío */}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg font-medium text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  disabled={Object.keys(errors).length > 0}
                >
                  🚀 Procesar {ejemploSeleccionado.title}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Información Técnica */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-8">
          <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-6 text-center">
            💡 Características Técnicas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚛️</span>
              </div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">React Hook Form</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Gestión optimizada del estado y validaciones</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">useFieldArray</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Campos dinámicos con registro automático</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Validación Completa</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Patrones regex, longitud, campos requeridos</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">UI/UX Avanzada</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Tema oscuro/claro, responsive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicFormExamples; 