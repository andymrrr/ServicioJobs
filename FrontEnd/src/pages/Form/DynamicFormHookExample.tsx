import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Contenedor } from '../../components/UI/Contenedor';
import Tarjeta from '../../components/UI/Tarjeta';
import DynamicFieldFormHookFixed, { 
  FormularioDatos, 
  ConfiguracionCampoHook 
} from '../../components/UI/DynamicFieldFormHookFixed';
import DynamicFormComparison from '../../components/UI/DynamicFormComparison';

const DynamicFormHookExample = () => {
  const [datosFormulario, setDatosFormulario] = useState<FormularioDatos>({});

  // Configuración para API Request Builder con React Hook Form
  const configuracionAPI: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Texto',
      tamaño: '6',
      placeholder: 'Valor de texto',
      required: true
    },
    {
      tipo: 'select',
      label: 'Método HTTP',
      tamaño: '4',
      opciones: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      required: true
    },
    {
      tipo: 'checkbox',
      label: 'Booleano',
      tamaño: '3'
    },
    {
      tipo: 'textarea',
      label: 'Texto Largo',
      tamaño: '12',
      placeholder: 'Descripción o contenido largo'
    }
  ];

  // Configuración para formulario de configuración
  const configuracionSimple: ConfiguracionCampoHook[] = [
    {
      tipo: 'input',
      label: 'Variable',
      tamaño: '8',
      placeholder: 'Nombre de la variable',
      required: true
    },
    {
      tipo: 'select',
      label: 'Tipo',
      tamaño: '4',
      opciones: ['String', 'Number', 'Boolean', 'Object'],
      required: true
    }
  ];

  const manejarEnvioAPI = (datos: FormularioDatos) => {
    console.log('Datos API enviados:', datos);
    alert('¡Formulario API enviado exitosamente! Revisa la consola.');
  };

  const manejarCambioAPI = (datos: FormularioDatos) => {
    setDatosFormulario(datos);
  };

  const [datosSimples, setDatosSimples] = useState<FormularioDatos>({});

  const manejarEnvioSimple = (datos: FormularioDatos) => {
    console.log('Datos simples enviados:', datos);
    alert('¡Formulario de variables enviado exitosamente! Revisa la consola.');
  };

  const manejarCambioSimple = (datos: FormularioDatos) => {
    setDatosSimples(datos);
  };

  return (
    <Contenedor>
      <Breadcrumb pageName="Formularios Dinámicos con Hook Form" />

      <div className="grid grid-cols-1 gap-6">
        
        {/* Ejemplo 1: API Request Builder con React Hook Form */}
        <Tarjeta
          titulo="API Request Builder - Hook Form"
          subtitulo="Formulario dinámico integrado con React Hook Form y validaciones"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'blue'
          }}
        >
          <div className="p-6">
            <DynamicFieldFormHookFixed
              pestañas={['Query Params', 'Headers', 'Body']}
              tiposCamposPermitidos={configuracionAPI}
              cantidadMaximaCampos={12}
              onSubmit={manejarEnvioAPI}
              onChange={manejarCambioAPI}
              valoresIniciales={{
                'Headers': [
                  {
                    id: 'header_1',
                    nombre: 'Content-Type',
                    valor: 'application/json',
                    tipo: 'input'
                  },
                  {
                    id: 'header_2',
                    nombre: 'Authorization',
                    valor: '',
                    tipo: 'input'
                  }
                ],
                'Query Params': [],
                'Body': []
              }}
              textoBotonEnvio="Enviar Request"
            />
          </div>
        </Tarjeta>

        {/* Ejemplo 2: Configuración Simple con Hook Form */}
        <Tarjeta
          titulo="Variables de Sistema - Hook Form"
          subtitulo="Gestión de variables con validación de React Hook Form"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'green'
          }}
        >
          <div className="p-6">
            <DynamicFieldFormHookFixed
              pestañas={['Variables de Entorno', 'Variables de Sesión']}
              tiposCamposPermitidos={configuracionSimple}
              cantidadMaximaCampos={8}
              onSubmit={manejarEnvioSimple}
              onChange={manejarCambioSimple}
              textoBotonEnvio="Guardar Variables"
            />
          </div>
        </Tarjeta>

        {/* Vista de datos en tiempo real */}
        <Tarjeta
          titulo="Datos en Tiempo Real - Hook Form"
          subtitulo="Visualización de los datos del formulario con React Hook Form"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'blue'
          }}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Datos del API Builder */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  📡 API Request Data
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-80 whitespace-pre-wrap">
                    {JSON.stringify(datosFormulario, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Datos del formulario simple */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  ⚙️ Variables Data
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-80 whitespace-pre-wrap">
                    {JSON.stringify(datosSimples, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Estadísticas mejoradas */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Object.values(datosFormulario).flat().length}
                </div>
                <div className="text-sm text-blue-500 dark:text-blue-300 mt-1">
                  Campos API
                </div>
                <div className="text-xs text-blue-400 dark:text-blue-500 mt-1">
                  Con validación Hook Form
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Object.values(datosSimples).flat().length}
                </div>
                <div className="text-sm text-green-500 dark:text-green-300 mt-1">
                  Variables
                </div>
                <div className="text-xs text-green-400 dark:text-green-500 mt-1">
                  Formularios controlados
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center border border-purple-200 dark:border-purple-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Object.keys(datosFormulario).length + Object.keys(datosSimples).length}
                </div>
                <div className="text-sm text-purple-500 dark:text-purple-300 mt-1">
                  Pestañas
                </div>
                <div className="text-xs text-purple-400 dark:text-purple-500 mt-1">
                  Navegación dinámica
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center border border-orange-200 dark:border-orange-800">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {Object.values({...datosFormulario, ...datosSimples})
                    .flat()
                    .filter(campo => campo.nombre && campo.valor).length}
                </div>
                <div className="text-sm text-orange-500 dark:text-orange-300 mt-1">
                  Completos
                </div>
                <div className="text-xs text-orange-400 dark:text-orange-500 mt-1">
                  Listos para envío
                </div>
              </div>
            </div>
          </div>
        </Tarjeta>

        {/* Características de Hook Form */}
        <Tarjeta
          titulo="Características de React Hook Form Integradas"
          subtitulo="Funcionalidades adicionales con la integración de Hook Form"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'green'
          }}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  ✅ Validación Automática
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Validación en tiempo real de campos requeridos, patrones y longitudes usando Hook Form
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  🎯 Rendimiento Optimizado
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Menor re-renderizado y mejor performance con useFieldArray de Hook Form
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  🔧 Componentes Reutilizables
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Usa los componentes HookFormInput, HookFormTextarea, etc. del proyecto
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  📋 Control de Estado
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Estado del formulario completamente controlado con register y watch de Hook Form
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">
                  🚨 Manejo de Errores
                </h4>
                <p className="text-sm text-pink-600 dark:text-pink-400">
                  Visualización de errores integrada con los componentes HookForm existentes
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                  📤 Submit Handling
                </h4>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Manejo de envío de formularios con handleSubmit y validación previa
                </p>
              </div>

            </div>
          </div>
        </Tarjeta>

        {/* Comparación entre versiones */}
        <DynamicFormComparison />

      </div>
    </Contenedor>
  );
};

export default DynamicFormHookExample; 