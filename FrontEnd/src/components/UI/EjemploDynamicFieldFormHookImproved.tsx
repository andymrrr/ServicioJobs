import React from 'react';
import { useForm } from 'react-hook-form';
import HookFormDinamico, { ConfiguracionCampoHook, FormularioTabData } from '../FormulariosControles/HookFormDinamico';

// Estructura de datos para React Hook Form
interface FormData {
  tabs: {
    [key: string]: any[];
  };
}

const EjemploDynamicFieldFormHookImproved: React.FC = () => {
  // Configuración de tipos de campos permitidos
  const tiposCamposPermitidos: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Texto',
      tamaño: '6',
      placeholder: 'Ingresa un valor de texto',
      required: true,
      requiredMessage: 'El campo de texto es obligatorio',
      minLength: {
        value: 2,
        message: 'Mínimo 2 caracteres'
      },
      maxLength: {
        value: 50,
        message: 'Máximo 50 caracteres'
      }
    },
    {
      tipo: 'textarea',
      label: 'Texto Largo',
      tamaño: '12',
      placeholder: 'Descripción detallada...',
      required: false
    },
    {
      tipo: 'select',
      label: 'Selección',
      tamaño: '4',
      required: true,
      requiredMessage: 'Debes seleccionar una opción',
      opciones: [
        { valor: 'opcion1', etiqueta: 'Opción 1' },
        { valor: 'opcion2', etiqueta: 'Opción 2' },
        { valor: 'opcion3', etiqueta: 'Opción 3' },
        { valor: 'bearer', etiqueta: 'Bearer Token' },
        { valor: 'basic', etiqueta: 'Basic Auth' },
        { valor: 'apikey', etiqueta: 'API Key' }
      ]
    },
    {
      tipo: 'checkbox',
      label: 'Activar/Desactivar',
      tamaño: '3',
      required: false
    }
  ];

  // Valores iniciales para React Hook Form
  const valoresInicialesPorDefecto: FormData = {
    tabs: {
      'Query Params': [
        {
          nombre: 'limit',
          valor: '10',
          tipo: 'input'
        },
        {
          nombre: 'offset',
          valor: '0',
          tipo: 'input'
        }
      ],
      'Headers': [
        {
          nombre: 'Authorization',
          valor: 'bearer',
          tipo: 'select'
        },
        {
          nombre: 'Content-Type',
          valor: 'application/json',
          tipo: 'input'
        }
      ],
      'Body': []
    }
  };

  // Configurar React Hook Form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<FormData>({
    defaultValues: valoresInicialesPorDefecto,
    mode: 'onChange'
  });

  // Manejar envío del formulario
  const manejarEnvio = handleSubmit((data) => {
    console.log('📋 Datos del formulario:', data.tabs);
    
    // Procesar los datos para cada pestaña
    Object.entries(data.tabs).forEach(([pestaña, campos]) => {
      console.log(`🔖 ${pestaña}:`, campos);
      
      // Ejemplo: convertir a formato clave-valor para APIs
      const objetoClavesValores = campos.reduce((acc, campo) => {
        if (campo.nombre && campo.valor) {
          acc[campo.nombre] = campo.tipo === 'checkbox' ? campo.activo : campo.valor;
        }
        return acc;
      }, {} as Record<string, any>);
      
      console.log(`✅ ${pestaña} como objeto:`, objetoClavesValores);
    });

    // Aquí podrías enviar los datos a una API
    alert('¡Formulario enviado! Revisa la consola para ver los datos.');
  });

  // Manejar cambios en tiempo real (opcional)
  const manejarCambios = (_datos: FormularioTabData) => {
    // console.log('🔄 Cambios en tiempo real:', datos);
    // Aquí puedes hacer validaciones en tiempo real, guardar en localStorage, etc.
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🚀 Formulario Dinámico Mejorado
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Ejemplo de uso del componente <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">DynamicFieldFormHookImproved</code> 
              que utiliza correctamente React Hook Form y tus componentes existentes.
            </p>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ✨ Mejoras Implementadas:
            </h3>
            <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1 text-sm">
              <li><strong>React Hook Form:</strong> Registro correcto de campos dinámicos con useFieldArray</li>
              <li><strong>Componentes Reutilizados:</strong> Usa HookFormInput, HookFormTextarea, SelectFormHook, etc.</li>
              <li><strong>Validación Integrada:</strong> Validaciones automáticas con mensajes personalizados</li>
              <li><strong>Estado Optimizado:</strong> No más estado manual, todo manejado por React Hook Form</li>
              <li><strong>TypeScript Mejorado:</strong> Tipos más específicos y seguros</li>
              <li><strong>UX Mejorada:</strong> Indica errores y deshabilita envío si hay problemas</li>
            </ul>
          </div>

          <form onSubmit={manejarEnvio}>
            <HookFormDinamico
              pestañas={['Query Params', 'Headers', 'Body']}
              tiposCamposPermitidos={tiposCamposPermitidos}
              cantidadMaximaCampos={15}
              onChange={manejarCambios}
              valoresIniciales={valoresInicialesPorDefecto.tabs}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              // Props de React Hook Form
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              getValues={getValues}
            />
            
            {/* Botón de envío */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Object.keys(errors).length > 0}
              >
                🚀 Enviar Formulario
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              📝 Cómo usar este componente:
            </h3>
            <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
              <p><strong>1.</strong> Define la configuración de campos permitidos</p>
              <p><strong>2.</strong> Opcionalmente, proporciona valores iniciales</p>
              <p><strong>3.</strong> Implementa las funciones onSubmit y onChange</p>
              <p><strong>4.</strong> ¡Listo! El componente se encarga del resto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EjemploDynamicFieldFormHookImproved; 