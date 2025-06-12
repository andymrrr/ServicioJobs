import React, { useState } from 'react';
import Collapsible from './Collapsible';

const CollapsibleExamples: React.FC = () => {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Ejemplos del Componente Collapsible
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Diferentes variantes y configuraciones del componente desplegable
        </p>
      </div>

      {/* Variantes Básicas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          🎨 Variantes de Diseño
        </h2>
        <div className="grid gap-4">
          <Collapsible 
            title="Variante Default (Degradado)"
            subtitle="Con fondo degradado y bordes redondeados"
            variant="default"
            headerColor="blue"
            icon="🎨"
          >
            <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <p>Esta es la variante por defecto con un hermoso degradado de fondo.</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Perfecta para secciones importantes que necesitan destacar.
              </p>
            </div>
          </Collapsible>

          <Collapsible 
            title="Variante Card (Tarjeta)"
            variant="card"
            icon="📋"
          >
            <div className="space-y-3">
              <p>Esta variante simula una tarjeta con sombra sutil.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <strong>Ventaja 1:</strong> Diseño limpio
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <strong>Ventaja 2:</strong> Fácil de leer
                </div>
              </div>
            </div>
          </Collapsible>

          <Collapsible 
            title="Variante Minimal (Minimalista)"
            variant="minimal"
            expandIcon="plus"
          >
            <div className="pt-4">
              <p>Diseño minimalista perfecto para FAQs o listas simples.</p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                <li>Sin bordes decorativos</li>
                <li>Solo una línea divisoria</li>
                <li>Ideal para contenido textual</li>
              </ul>
            </div>
          </Collapsible>

          <Collapsible 
            title="Variante Bordered (Con Borde)"
            variant="bordered"
            headerColor="green"
            icon="✅"
          >
            <div className="p-4">
              <p>Variante con borde completo, ideal para formularios o configuraciones.</p>
              <div className="mt-3 p-3 bg-green-50 dark:bg-gray-700 rounded border-l-4 border-green-400">
                <strong>Tip:</strong> Esta variante es perfecta para agrupar controles relacionados.
              </div>
            </div>
          </Collapsible>
        </div>
      </section>

      {/* Colores */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          🌈 Colores Disponibles
        </h2>
        <div className="grid gap-3">
          {[
            { color: 'blue', icon: '💙', title: 'Azul - Información' },
            { color: 'green', icon: '💚', title: 'Verde - Éxito' },
            { color: 'purple', icon: '💜', title: 'Púrpura - Premium' },
            { color: 'orange', icon: '🧡', title: 'Naranja - Advertencia' },
            { color: 'red', icon: '❤️', title: 'Rojo - Error/Importante' },
            { color: 'gray', icon: '🤍', title: 'Gris - Neutral (Default)' }
          ].map(({ color, icon, title }) => (
            <Collapsible 
              key={color}
              title={title}
              headerColor={color as any}
              icon={icon}
              size="sm"
            >
              <p className="text-sm">
                Contenido usando el color <strong>{color}</strong>. 
                Ideal para categorizar diferentes tipos de información.
              </p>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* Tamaños */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          📏 Diferentes Tamaños
        </h2>
        <div className="space-y-3">
          <Collapsible 
            title="Tamaño Pequeño (sm)"
            size="sm"
            headerColor="blue"
            icon="🔸"
          >
            <p className="text-sm">Contenido compacto para espacios reducidos.</p>
          </Collapsible>

          <Collapsible 
            title="Tamaño Mediano (md) - Default"
            size="md"
            headerColor="green"
            icon="🔹"
          >
            <p>Tamaño estándar, equilibrio perfecto entre espacio y legibilidad.</p>
          </Collapsible>

          <Collapsible 
            title="Tamaño Grande (lg)"
            size="lg"
            headerColor="purple"
            icon="🔶"
          >
            <p className="text-lg">
              Tamaño grande para contenido importante que necesita más presencia visual.
            </p>
          </Collapsible>
        </div>
      </section>

      {/* Iconos de Expansión */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          🔧 Iconos de Expansión
        </h2>
        <div className="grid gap-3">
          <Collapsible 
            title="Icono Arrow (Flecha) - Default"
            expandIcon="arrow"
            headerColor="blue"
          >
            <p>Icono de flecha que rota al expandir/contraer.</p>
          </Collapsible>

          <Collapsible 
            title="Icono Plus (Cruz)"
            expandIcon="plus"
            headerColor="green"
          >
            <p>Icono de plus que se convierte en X al expandir.</p>
          </Collapsible>

          <Collapsible 
            title="Icono Chevron"
            expandIcon="chevron"
            headerColor="purple"
          >
            <p>Icono chevron minimalista.</p>
          </Collapsible>
        </div>
      </section>

      {/* Casos de Uso Avanzados */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          ⚡ Casos de Uso Avanzados
        </h2>
        
        {/* Estado Controlado */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
            Estado Controlado Externamente
          </h3>
          <div className="flex gap-3 mb-3">
            <button 
              onClick={() => setControlledOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Abrir
            </button>
            <button 
              onClick={() => setControlledOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
          <Collapsible 
            title="Panel Controlado"
            subtitle={`Estado actual: ${controlledOpen ? 'Abierto' : 'Cerrado'}`}
            defaultOpen={controlledOpen}
            onToggle={(isOpen) => {
              setControlledOpen(isOpen);
              console.log('Estado cambiado:', isOpen);
            }}
            headerColor="orange"
            icon="🎮"
          >
            <div className="p-4 bg-orange-50 dark:bg-gray-700 rounded">
              <p>Este panel puede ser controlado desde botones externos.</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Útil para sincronizar con otros elementos de la UI.
              </p>
            </div>
          </Collapsible>
        </div>

        {/* FAQ Example */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
            Sección de FAQ
          </h3>
          {[
            {
              q: "¿Cómo instalo el componente?",
              a: "Simplemente importa el componente desde la carpeta UI/Collapsible y úsalo en tu JSX."
            },
            {
              q: "¿Es compatible con modo oscuro?",
              a: "Sí, el componente tiene soporte completo para modo oscuro usando clases de Tailwind."
            },
            {
              q: "¿Puedo personalizar los estilos?",
              a: "Absolutamente. Puedes usar las props className, headerClassName y contentClassName para personalizar los estilos."
            }
          ].map((faq, index) => (
            <Collapsible 
              key={index}
              title={faq.q}
              variant="minimal"
              expandIcon="plus"
            >
              <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
            </Collapsible>
          ))}
        </div>

        {/* Configuración de Formulario */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
            Configuración de Formulario
          </h3>
          <Collapsible 
            title="Configuración Avanzada"
            subtitle="Opciones adicionales para usuarios expertos"
            variant="default"
            headerColor="blue"
            icon="⚙️"
            defaultOpen={false}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Timeout (segundos)
                </label>
                <input 
                  type="number" 
                  placeholder="30"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reintentos
                </label>
                <input 
                  type="number" 
                  placeholder="3"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Habilitar logs detallados
                  </span>
                </label>
              </div>
            </div>
          </Collapsible>
        </div>
      </section>

      {/* Estados Especiales */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          🚫 Estados Especiales
        </h2>
        <div className="space-y-3">
          <Collapsible 
            title="Panel Deshabilitado"
            subtitle="Este panel no se puede expandir"
            disabled={true}
            headerColor="gray"
            icon="🔒"
          >
            <p>Este contenido no debería ser visible.</p>
          </Collapsible>

          <Collapsible 
            title="Sin Animaciones"
            subtitle="Aparece/desaparece instantáneamente"
            animated={false}
            headerColor="red"
            icon="⚡"
          >
            <p>Este contenido aparece sin animaciones de transición.</p>
          </Collapsible>
        </div>
      </section>
    </div>
  );
};

export default CollapsibleExamples; 