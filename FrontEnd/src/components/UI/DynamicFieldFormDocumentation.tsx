import React from 'react';
import Tarjeta from './Tarjeta';

const DynamicFieldFormDocumentation = () => {
  const codigoEjemplo = `
import DynamicFieldForm, { 
  DatosPestaña, 
  ConfiguracionCampo 
} from './components/UI/DynamicFieldForm';

// Configurar tipos de campos permitidos
const configuracion: ConfiguracionCampo[] = [
  {
    tipo: 'input',
    label: 'Texto',
    tamaño: 'col-6',
    placeholder: 'Ingresa texto'
  },
  {
    tipo: 'select',
    label: 'Opciones',
    tamaño: 'col-4',
    opciones: ['Opción 1', 'Opción 2', 'Opción 3']
  },
  {
    tipo: 'checkbox',
    label: 'Booleano',
    tamaño: 'col-3'
  },
  {
    tipo: 'textarea',
    label: 'Texto Largo',
    tamaño: 'col-12'
  }
];

// Usar el componente
function MiFormulario() {
  const [datos, setDatos] = useState<DatosPestaña>({});
  
  const manejarCambio = (nuevosDatos: DatosPestaña) => {
    setDatos(nuevosDatos);
    console.log('Datos actualizados:', nuevosDatos);
  };

  return (
    <DynamicFieldForm
      pestañas={['Headers', 'Query Params', 'Body']}
      tiposCamposPermitidos={configuracion}
      cantidadMaximaCampos={10}
      onChange={manejarCambio}
      valoresIniciales={{
        'Headers': [
          {
            id: '1',
            nombre: 'Authorization',
            valor: 'Bearer token',
            tipo: 'input',
            tamaño: 'col-6'
          }
        ]
      }}
    />
  );
}`;

  return (
    <div className="space-y-6">
      
      {/* Introducción */}
      <Tarjeta
        titulo="DynamicFieldForm - Documentación"
        subtitulo="Componente para crear formularios con campos dinámicos organizados en pestañas"
        variante="defecto"
        lineaHeader={{
          mostrar: true,
          grosor: '2px',
          color: 'blue'
        }}
      >
        <div className="p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            El componente <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">DynamicFieldForm</code> 
            permite crear formularios donde los usuarios pueden agregar y eliminar campos dinámicamente, 
            organizados en pestañas configurables.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Características</h4>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <li>• Pestañas configurables</li>
                <li>• 4 tipos de campos (input, select, checkbox, textarea)</li>
                <li>• Tamaños de grid flexibles</li>
                <li>• Validación de cantidad máxima</li>
                <li>• Estado controlado</li>
                <li>• Valores iniciales</li>
                <li>• Dark mode support</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎯 Casos de Uso</h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                <li>• API Request Builder</li>
                <li>• Configuraciones dinámicas</li>
                <li>• Metadatos personalizados</li>
                <li>• Sistemas de etiquetado</li>
                <li>• Filtros avanzados</li>
                <li>• Headers HTTP</li>
              </ul>
            </div>
          </div>
        </div>
      </Tarjeta>

      {/* Props */}
      <Tarjeta
        titulo="Props del Componente"
        subtitulo="Configuraciones disponibles para el DynamicFieldForm"
        variante="defecto"
      >
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 font-semibold">Prop</th>
                  <th className="text-left py-2 font-semibold">Tipo</th>
                  <th className="text-left py-2 font-semibold">Requerido</th>
                  <th className="text-left py-2 font-semibold">Por Defecto</th>
                  <th className="text-left py-2 font-semibold">Descripción</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2"><code>pestañas</code></td>
                  <td><code>string[]</code></td>
                  <td>No</td>
                  <td><code>['Query Params', 'Headers']</code></td>
                  <td>Array de nombres de pestañas</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2"><code>tiposCamposPermitidos</code></td>
                  <td><code>ConfiguracionCampo[]</code></td>
                  <td>Sí</td>
                  <td>-</td>
                  <td>Array de configuraciones de tipos de campo</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2"><code>cantidadMaximaCampos</code></td>
                  <td><code>number</code></td>
                  <td>No</td>
                  <td><code>10</code></td>
                  <td>Máximo número de campos por pestaña</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2"><code>onChange</code></td>
                  <td><code>(datos: DatosPestaña) =&gt; void</code></td>
                  <td>Sí</td>
                  <td>-</td>
                  <td>Callback cuando cambian los datos</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2"><code>valoresIniciales</code></td>
                  <td><code>DatosPestaña</code></td>
                  <td>No</td>
                  <td><code>{}</code></td>
                  <td>Valores iniciales para cada pestaña</td>
                </tr>
                <tr>
                  <td className="py-2"><code>className</code></td>
                  <td><code>string</code></td>
                  <td>No</td>
                  <td><code>''</code></td>
                  <td>Clases CSS adicionales</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Tarjeta>

      {/* Tipos de datos */}
      <Tarjeta
        titulo="Interfaces TypeScript"
        subtitulo="Definiciones de tipos para el componente"
        variante="defecto"
      >
                 <div className="p-6">
           <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
             <pre className="text-sm">
{`// Tipos de campos soportados
type TipoCampo = 'input' | 'select' | 'checkbox' | 'textarea';

// Tamaños de grid
type TamanoCampo = 'col-3' | 'col-4' | 'col-6' | 'col-8' | 'col-12';

// Configuración de un tipo de campo
interface ConfiguracionCampo {
  tipo: TipoCampo;
  label: string;
  tamaño: TamanoCampo;
  opciones?: string[]; // Para selects
  placeholder?: string;
}

// Estructura de un campo individual
interface Campo {
  id: string;
  nombre: string;
  valor: string | boolean;
  tipo: TipoCampo;
  tamaño: TamanoCampo;
  opciones?: string[];
}

// Datos organizados por pestaña
interface DatosPestaña {
  [key: string]: Campo[];
}`}
             </pre>
           </div>
         </div>
      </Tarjeta>

      {/* Ejemplo de código */}
      <Tarjeta
        titulo="Ejemplo de Implementación"
        subtitulo="Código completo para usar el componente"
        variante="defecto"
      >
        <div className="p-6">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              {codigoEjemplo}
            </pre>
          </div>
        </div>
      </Tarjeta>

    </div>
  );
};

export default DynamicFieldFormDocumentation; 