import React from 'react';

// Función utilitaria para combinar clases de CSS
const combinarClases = (...clases: (string | undefined | null | false)[]): string => {
  return clases.filter(Boolean).join(' ');
};

interface PropiedadBotonPrimario {
  texto: string;
  deshabilitar?: boolean;
  tipo?: 'button' | 'submit' | 'reset';
  alineacion?: 'izquierda' | 'centro' | 'derecha';
  tamaño?: 'pequeño' | 'mediano' | 'grande';
  ajustarAlTexto?: boolean;
  onClick?: () => void;
  color?: 'primary' | 'green' | 'red' | 'gray' | 'lightBlue';
  variante?: 'solido' | 'outline' | 'ghost'; // Nueva prop para variantes
  icono?: React.ReactNode; // Para agregar iconos
  cargando?: boolean; // Estado de carga
  className?: string; // Para estilos adicionales
  'aria-label'?: string; // Para accesibilidad
}

const BotonPrimario = ({
  texto,
  deshabilitar = false,
  tipo = 'button',
  alineacion = 'centro',
  tamaño = 'mediano',
  ajustarAlTexto = false,
  onClick,
  color = 'primary',
  variante = 'solido',
  icono,
  cargando = false,
  className,
  'aria-label': ariaLabel,
}: PropiedadBotonPrimario) => {
  
  // Clases base del botón
  const claseBase = [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ];

  // Clases de tamaño
  const clasesTamaño = {
    pequeño: 'px-3 py-1.5 text-sm',
    mediano: 'px-4 py-2 text-base',
    grande: 'px-6 py-3 text-lg'
  };

  // Clases de color por variante
  const clasesColor = {
    primary: {
      solido: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500 focus:ring-blue-500',
      outline: 'border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-blue-500 hover:bg-blue-50 border-transparent focus:ring-blue-500',
    },
    green: {
      solido: 'bg-green-500 hover:bg-green-600 text-white border-green-500 focus:ring-green-500',
      outline: 'border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500',
      ghost: 'text-green-500 hover:bg-green-50 border-transparent focus:ring-green-500',
    },
    red: {
      solido: 'bg-red-500 hover:bg-red-600 text-white border-red-500 focus:ring-red-500',
      outline: 'border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-red-500 hover:bg-red-50 border-transparent focus:ring-red-500',
    },
    gray: {
      solido: 'bg-gray-500 hover:bg-gray-600 text-white border-gray-500 focus:ring-gray-500',
      outline: 'border-gray-500 text-gray-500 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-500 hover:bg-gray-50 border-transparent focus:ring-gray-500',
    },
    lightBlue: {
      solido: 'bg-blue-400 hover:bg-blue-500 text-white border-blue-400 focus:ring-blue-400',
      outline: 'border-blue-400 text-blue-400 hover:bg-blue-50 focus:ring-blue-400',
      ghost: 'text-blue-400 hover:bg-blue-50 border-transparent focus:ring-blue-400',
    },
  };

  // Clases de alineación para el contenedor
  const clasesAlineacion = {
    izquierda: 'justify-start',
    centro: 'justify-center',
    derecha: 'justify-end',
  };

  // Clases de ancho
  const claseAncho = ajustarAlTexto ? 'w-auto' : 'w-full';

  // Si el botón se ajusta al texto, no necesitamos el wrapper
  if (ajustarAlTexto) {
    return (
      <button
        type={tipo}
        onClick={onClick}
        disabled={deshabilitar || cargando}
        className={combinarClases(
          ...claseBase,
          clasesTamaño[tamaño],
          clasesColor[color][variante],
          claseAncho,
          className
        )}
        aria-label={ariaLabel || texto}
        aria-disabled={deshabilitar || cargando}
      >
        {cargando && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        )}
        {icono && !cargando && icono}
        {texto}
      </button>
    );
  }

  // Con wrapper para alineación
  return (
    <div className={`flex ${clasesAlineacion[alineacion]}`}>
      <button
        type={tipo}
        onClick={onClick}
        disabled={deshabilitar || cargando}
        className={combinarClases(
          ...claseBase,
          clasesTamaño[tamaño],
          clasesColor[color][variante],
          claseAncho,
          className
        )}
        aria-label={ariaLabel || texto}
        aria-disabled={deshabilitar || cargando}
      >
        {cargando && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        )}
        {icono && !cargando && icono}
        {texto}
      </button>
    </div>
  );
};

export default BotonPrimario;