import React from 'react';
import Tarjeta from './Tarjeta';
import { FaCheck, FaTimes, FaStar } from 'react-icons/fa';

const DynamicFormComparison = () => {
  const comparacionCaracteristicas = [
    {
      caracteristica: 'Gestión de Estado',
      version1: 'useState básico',
      version2: 'React Hook Form',
      mejor: 'version2'
    },
    {
      caracteristica: 'Validación',
      version1: 'Validación manual',
      version2: 'Validación automática integrada',
      mejor: 'version2'
    },
    {
      caracteristica: 'Rendimiento',
      version1: 'Re-renderizado en cada cambio',
      version2: 'Optimizado con useFieldArray',
      mejor: 'version2'
    },
    {
      caracteristica: 'Componentes',
      version1: 'HTML inputs nativos',
      version2: 'Componentes HookForm reutilizables',
      mejor: 'version2'
    },
    {
      caracteristica: 'Manejo de Errores',
      version1: 'Manejo manual de errores',
      version2: 'Errores integrados con form state',
      mejor: 'version2'
    },
    {
      caracteristica: 'Simplicidad',
      version1: 'Implementación más directa',
      version2: 'Requiere conocimiento de Hook Form',
      mejor: 'version1'
    },
    {
      caracteristica: 'Tamaño del Bundle',
      version1: 'Más liviano',
      version2: 'Incluye React Hook Form',
      mejor: 'version1'
    },
    {
      caracteristica: 'Escalabilidad',
      version1: 'Limitada para formularios complejos',
      version2: 'Excelente para formularios complejos',
      mejor: 'version2'
    }
  ];

  return (
    <Tarjeta
      titulo="Comparación: DynamicFieldForm vs DynamicFieldFormHook"
      subtitulo="Diferencias entre la versión básica y la versión con React Hook Form"
      variante="defecto"
      lineaHeader={{
        mostrar: true,
        grosor: '2px',
        color: 'blue'
      }}
    >
      <div className="p-6">
        
        {/* Resumen ejecutivo */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Versión Básica */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                DynamicFieldForm
              </h3>
              <span className="text-sm px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-blue-700 dark:text-blue-300">
                Versión Básica
              </span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
              Implementación directa con useState y componentes HTML nativos. 
              Ideal para casos simples y cuando se requiere una solución liviana.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FaCheck className="text-green-500" size={12} />
                <span>Fácil de entender</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaCheck className="text-green-500" size={12} />
                <span>Bundle más pequeño</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaTimes className="text-red-500" size={12} />
                <span>Validación manual</span>
              </div>
            </div>
          </div>

          {/* Versión Hook Form */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                DynamicFieldFormHook
              </h3>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" size={12} />
                <span className="text-sm px-2 py-1 bg-green-200 dark:bg-green-800 rounded text-green-700 dark:text-green-300">
                  Recomendado
                </span>
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mb-4">
              Integración completa con React Hook Form usando los componentes 
              HookForm existentes. Óptimo para formularios complejos con validación.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FaCheck className="text-green-500" size={12} />
                <span>Validación automática</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaCheck className="text-green-500" size={12} />
                <span>Mejor rendimiento</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaCheck className="text-green-500" size={12} />
                <span>Componentes reutilizables</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de comparación detallada */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 font-semibold">Característica</th>
                <th className="text-left py-3 font-semibold text-blue-700 dark:text-blue-300">
                  DynamicFieldForm
                </th>
                <th className="text-left py-3 font-semibold text-green-700 dark:text-green-300">
                  DynamicFieldFormHook
                </th>
                <th className="text-center py-3 font-semibold">Mejor</th>
              </tr>
            </thead>
            <tbody>
              {comparacionCaracteristicas.map((item, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-3 font-medium">{item.caracteristica}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{item.version1}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{item.version2}</td>
                  <td className="py-3 text-center">
                    {item.mejor === 'version1' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                        <FaStar size={10} />
                        Básica
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">
                        <FaStar size={10} />
                        Hook Form
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recomendación */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
            💡 Recomendación
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Usa DynamicFieldFormHook</strong> si ya tienes React Hook Form en tu proyecto y necesitas validaciones complejas. 
            <strong>Usa DynamicFieldForm</strong> para casos simples o si prefieres una implementación más directa sin dependencias adicionales.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/forms/dynamic-form"
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Ver Versión Básica
          </a>
          <a
            href="/forms/dynamic-form-hook"
            className="inline-flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            <FaStar size={12} />
            Ver Versión Hook Form
          </a>
        </div>

      </div>
    </Tarjeta>
  );
};

export default DynamicFormComparison; 