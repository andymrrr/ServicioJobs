import React from 'react';

interface PropiedadTitulo {
  children: React.ReactNode; 
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; 
  tamaño?: 'pequeño' | 'mediano' | 'grande' | 'extra-grande';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
  peso?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  alineacion?: 'left' | 'center' | 'right';
  separador?: boolean;
  tipoSeparador?: 'linea' | 'puntos' | 'degradado' | 'multicolor' | 'arcoiris' | 'gradiente-azul' | 'gradiente-verde' | 'gradiente-rojo';
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
    degradado: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600',
    multicolor: 'bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-red-500',
    arcoiris: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
    'gradiente-azul': 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
    'gradiente-verde': 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
    'gradiente-rojo': 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
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

    // Separadores con gradientes (no usan colorSeparador)
    if (['degradado', 'multicolor', 'arcoiris', 'gradiente-azul', 'gradiente-verde', 'gradiente-rojo'].includes(tipoSeparador)) {
      return (
        <div className={`h-1 mt-2 rounded-full ${configuracionSeparadores[tipoSeparador]}`} />
      );
    }

    // Separadores tradicionales (usan colorSeparador)
    const separadorConfig = configuracionSeparadores[tipoSeparador] as { primary: string; secondary: string; gray: string; };
    return (
      <div className={`border-b mt-2 ${separadorConfig[colorSeparador]}`} />
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
