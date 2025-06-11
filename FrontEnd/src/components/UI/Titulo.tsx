import React from 'react';

interface PropiedadTitulo {
  children: React.ReactNode; 
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; 
  tamaño?: 'pequeño' | 'mediano' | 'grande' | 'extra-grande';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
  peso?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  alineacion?: 'left' | 'center' | 'right';
  separador?: boolean;
  tipoSeparador?: 'linea' | 'puntos' | 'degradado';
  colorSeparador?: 'primary' | 'secondary' | 'gray';
  espacioInferior?: 'pequeño' | 'mediano' | 'grande' | 'extra-grande';
  icono?: React.ReactNode;
  posicionIcono?: 'izquierda' | 'derecha';
  className?: string;
  subtitulo?: string;
}

const Titulo = ({ 
  children, 
  level = 'h4',
  tamaño = 'mediano',
  color = 'dark',
  peso = 'semibold',
  alineacion = 'left',
  separador = false,
  tipoSeparador = 'linea',
  colorSeparador = 'gray',
  espacioInferior = 'mediano',
  icono,
  posicionIcono = 'izquierda',
  className = '',
  subtitulo
}: PropiedadTitulo) => {
  
  const Tag = level;
  
  // Configuración de tamaños por nivel y prop
  const configuracionTamaño = {
    h1: {
      pequeño: 'text-2xl',
      mediano: 'text-3xl',
      grande: 'text-4xl',
      'extra-grande': 'text-5xl'
    },
    h2: {
      pequeño: 'text-xl',
      mediano: 'text-2xl',
      grande: 'text-3xl',
      'extra-grande': 'text-4xl'
    },
    h3: {
      pequeño: 'text-lg',
      mediano: 'text-xl',
      grande: 'text-2xl',
      'extra-grande': 'text-3xl'
    },
    h4: {
      pequeño: 'text-base',
      mediano: 'text-lg',
      grande: 'text-xl',
      'extra-grande': 'text-2xl'
    },
    h5: {
      pequeño: 'text-sm',
      mediano: 'text-base',
      grande: 'text-lg',
      'extra-grande': 'text-xl'
    },
    h6: {
      pequeño: 'text-xs',
      mediano: 'text-sm',
      grande: 'text-base',
      'extra-grande': 'text-lg'
    }
  };

  // Configuración de colores
  const configuracionColores = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
    dark: 'text-black dark:text-white',
    light: 'text-gray-500 dark:text-gray-300'
  };

  // Configuración de peso de fuente
  const configuracionPeso = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  // Configuración de alineación
  const configuracionAlineacion = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  // Configuración de espacio inferior
  const configuracionEspacio = {
    pequeño: 'mb-2',
    mediano: 'mb-4',
    grande: 'mb-6',
    'extra-grande': 'mb-8'
  };

  // Configuración de separadores
  const configuracionSeparadores = {
    linea: {
      primary: 'border-blue-200 dark:border-blue-800',
      secondary: 'border-gray-200 dark:border-gray-700',
      gray: 'border-gray-200 dark:border-strokedark'
    },
    puntos: {
      primary: 'border-blue-200 dark:border-blue-800 border-dotted',
      secondary: 'border-gray-200 dark:border-gray-700 border-dotted',
      gray: 'border-gray-200 dark:border-strokedark border-dotted'
    },
    degradado: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600'
  };

  // Construir clases CSS
  const clasesTitulo = [
    configuracionTamaño[level][tamaño],
    configuracionColores[color],
    configuracionPeso[peso],
    configuracionAlineacion[alineacion],
    separador ? 'pb-2' : configuracionEspacio[espacioInferior],
    'leading-tight',
    className
  ].filter(Boolean).join(' ');

  const clasesContenedor = [
    separador ? configuracionEspacio[espacioInferior] : '',
    'relative'
  ].filter(Boolean).join(' ');

  const renderSeparador = () => {
    if (!separador) return null;

    if (tipoSeparador === 'degradado') {
      return (
        <div className={`h-px mt-2 ${configuracionSeparadores.degradado}`} />
      );
    }

    return (
      <div className={`border-b mt-2 ${configuracionSeparadores[tipoSeparador][colorSeparador]}`} />
    );
  };

  const renderContenidoTitulo = () => (
    <div className="flex items-center gap-2">
      {icono && posicionIcono === 'izquierda' && (
        <span className="inline-flex">{icono}</span>
      )}
      <span className="flex-1">{children}</span>
      {icono && posicionIcono === 'derecha' && (
        <span className="inline-flex">{icono}</span>
      )}
    </div>
  );

  return (
    <div className={clasesContenedor}>
      <Tag className={clasesTitulo}>
        {renderContenidoTitulo()}
      </Tag>
      
      {subtitulo && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {subtitulo}
        </p>
      )}
      
      {renderSeparador()}
    </div>
  );
};

export default Titulo;
