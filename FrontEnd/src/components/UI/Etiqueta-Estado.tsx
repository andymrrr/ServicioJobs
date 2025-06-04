import React from "react";

type TipoEstado = 'exito' | 'error' | 'advertencia' | 'info' | 'pendiente' | 'inactivo' | 'personalizado';
type Tamaño = 'pequeño' | 'normal' | 'grande';

interface PropiedadEtiqueta {
  texto: string;
  estado?: TipoEstado;
  estatus?: number;
  anchoCompleto?: boolean;
  tamaño?: Tamaño;
  icono?: React.ReactNode;
  colorPersonalizado?: string;
  colorTextoPersonalizado?: string;
  conAnimacion?: boolean;
  conBorde?: boolean;
  className?: string;
}

const EtiquetaEstado: React.FC<PropiedadEtiqueta> = ({
  texto,
  estado = 'personalizado',
  estatus,
  anchoCompleto = false,
  tamaño = 'normal',
  icono,
  colorPersonalizado,
  colorTextoPersonalizado,
  conAnimacion = true,
  conBorde = false,
  className = '',
}) => {
  // Si se proporciona estatus, determinar el estado basado en el número
  if (estatus !== undefined) {
    estado = estatus === 1 ? 'exito' : 'inactivo';
  }

  const obtenerEstilosBase = () => {
    const estilos = {
      exito: 'bg-success-lighter text-success dark:bg-success dark:text-white',
      error: 'bg-danger-lighter text-danger dark:bg-danger dark:text-white',
      advertencia: 'bg-warning-lighter text-warning dark:bg-warning dark:text-white',
      info: 'bg-info-lighter text-info dark:bg-info dark:text-white',
      pendiente: 'bg-purple-lighter text-purple dark:bg-purple dark:text-white',
      inactivo: 'bg-gray-lighter text-gray dark:bg-gray dark:text-white',
      personalizado: colorPersonalizado ? 
        `bg-${colorPersonalizado} ${colorTextoPersonalizado ? `text-${colorTextoPersonalizado}` : 'text-white'}` : 
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };

    return estilos[estado];
  };

  const obtenerTamaño = () => {
    const tamaños = {
      pequeño: 'text-xs px-2 py-0.5',
      normal: 'text-sm px-3 py-1',
      grande: 'text-base px-4 py-1.5'
    };

    return tamaños[tamaño];
  };

  const obtenerAnimacion = () => {
    if (!conAnimacion) return '';
    return 'transition-all duration-200 ease-in-out hover:opacity-90 hover:scale-105';
  };

  const obtenerBorde = () => {
    if (!conBorde) return '';
    return 'border border-current border-opacity-20';
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center gap-1.5
        font-semibold rounded-full
        ${obtenerEstilosBase()}
        ${obtenerTamaño()}
        ${obtenerAnimacion()}
        ${obtenerBorde()}
        ${anchoCompleto ? "w-full" : ""}
        ${className}
      `}
    >
      {icono && <span className="flex-shrink-0">{icono}</span>}
      {texto}
    </span>
  );
};

export default EtiquetaEstado;
