import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Contenedor } from '../../components/UI/Contenedor';
import Tarjeta from '../../components/UI/Tarjeta';
import DynamicFieldForm, { 
  DatosPestaña, 
  ConfiguracionCampo 
} from '../../components/UI/DynamicFieldForm';

const DynamicFormExample = () => {
  const [datosFormulario, setDatosFormulario] = useState<DatosPestaña>({});

  // Configuración para API Request Builder
  const configuracionAPI: ConfiguracionCampo[] = [
    {
      tipo: 'input',
      label: 'Texto',
      tamaño: 'col-6',
      placeholder: 'Valor de texto'
    },
    {
      tipo: 'select',
      label: 'Método HTTP',
      tamaño: 'col-4',
      opciones: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    },
    {
      tipo: 'checkbox',
      label: 'Booleano',
      tamaño: 'col-3'
    },
    {
      tipo: 'textarea',
      label: 'Texto Largo',
      tamaño: 'col-12',
      placeholder: 'Descripción o contenido largo'
    }
  ];

  // Configuración para formulario de configuración
  const configuracionSimple: ConfiguracionCampo[] = [
    {
      tipo: 'input',
      label: 'Campo Simple',
      tamaño: 'col-8'
    },
    {
      tipo: 'select',
      label: 'Opciones',
      tamaño: 'col-4',
      opciones: ['Opción 1', 'Opción 2', 'Opción 3']
    }
  ];

  const manejarCambioAPI = (datos: DatosPestaña) => {
    setDatosFormulario(datos);
    console.log('Datos API actualizados:', datos);
  };

  const [datosSimples, setDatosSimples] = useState<DatosPestaña>({});

  const manejarCambioSimple = (datos: DatosPestaña) => {
    setDatosSimples(datos);
    console.log('Datos simples actualizados:', datos);
  };

  return (
    <Contenedor>
      <Breadcrumb pageName="Formularios Dinámicos" />
      
      {/* Nota sobre la versión Hook Form */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              💡 Nueva Versión Disponible
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              Ahora disponible: DynamicFieldForm integrado con React Hook Form para mejor validación y rendimiento.
            </p>
          </div>
          <a
            href="/forms/dynamic-form-hook"
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Ver Hook Form →
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Ejemplo 1: API Request Builder */}
        <Tarjeta
          titulo="API Request Builder"
          subtitulo="Formulario dinámico para construir peticiones HTTP"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'blue'
          }}
        >
          <div className="p-6">
            <DynamicFieldForm
              pestañas={['Query Params', 'Headers', 'Body']}
              tiposCamposPermitidos={configuracionAPI}
              cantidadMaximaCampos={15}
              onChange={manejarCambioAPI}
              valoresIniciales={{
                'Query Params': [],
                'Headers': [
                  {
                    id: 'header_inicial',
                    nombre: 'Content-Type',
                    valor: 'application/json',
                    tipo: 'input',
                    tamaño: 'col-6'
                  }
                ],
                'Body': []
              }}
            />
          </div>
        </Tarjeta>

        {/* Ejemplo 2: Configuración Simple */}
        <Tarjeta
          titulo="Configuración de Variables"
          subtitulo="Formulario dinámico simple con menos opciones"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'green'
          }}
        >
          <div className="p-6">
            <DynamicFieldForm
              pestañas={['Variables', 'Configuración']}
              tiposCamposPermitidos={configuracionSimple}
              cantidadMaximaCampos={5}
              onChange={manejarCambioSimple}
            />
          </div>
        </Tarjeta>

        {/* Vista de datos en tiempo real */}
        <Tarjeta
          titulo="Datos en Tiempo Real"
          subtitulo="Visualización de los datos del formulario dinámico"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'yellow'
          }}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Datos del API Builder */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  API Request Data
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-60">
                    {JSON.stringify(datosFormulario, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Datos del formulario simple */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Variables Data
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-60">
                    {JSON.stringify(datosSimples, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {Object.values(datosFormulario).flat().length}
                </div>
                <div className="text-sm text-blue-500 dark:text-blue-300">
                  Campos API
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {Object.values(datosSimples).flat().length}
                </div>
                <div className="text-sm text-green-500 dark:text-green-300">
                  Variables
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {Object.keys(datosFormulario).length + Object.keys(datosSimples).length}
                </div>
                <div className="text-sm text-purple-500 dark:text-purple-300">
                  Pestañas Activas
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {Object.values({...datosFormulario, ...datosSimples})
                    .flat()
                    .filter(campo => campo.nombre && campo.valor).length}
                </div>
                <div className="text-sm text-orange-500 dark:text-orange-300">
                  Completos
                </div>
              </div>
            </div>
          </div>
        </Tarjeta>

        {/* Casos de uso y documentación */}
        <Tarjeta
          titulo="Casos de Uso"
          subtitulo="Ejemplos de implementación del componente DynamicFieldForm"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'red'
          }}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  🔗 API Testing
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Construir dinámicamente headers, query params y body para testing de APIs
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  ⚙️ Configuraciones
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Permitir a usuarios crear configuraciones personalizadas key-value
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  📊 Formularios Meta
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Crear formularios que permiten definir otros formularios dinámicamente
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  🏷️ Etiquetas/Tags
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Sistema de etiquetado dinámico con categorías y valores
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">
                  🗂️ Metadatos
                </h4>
                <p className="text-sm text-pink-600 dark:text-pink-400">
                  Agregar metadatos personalizados a cualquier entidad del sistema
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                  🎛️ Filtros Avanzados
                </h4>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Construir filtros de búsqueda complejos con múltiples criterios
                </p>
              </div>

            </div>
          </div>
        </Tarjeta>

      </div>
    </Contenedor>
  );
};

export default DynamicFormExample; 