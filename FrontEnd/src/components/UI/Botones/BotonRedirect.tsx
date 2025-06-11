import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Función utilitaria para combinar clases de CSS
const combinarClases = (...clases: (string | undefined | null | false)[]): string => {
  return clases.filter(Boolean).join(' ');
};

interface PropiedadBotonRedirect {
  href: string;
  texto: string;
  icono?: React.ReactNode;
  tipo?: 'success' | 'primary' | 'delete' | 'warning' | 'info' | 'gray';
  variante?: 'solido' | 'outline' | 'ghost';
  tamaño?: 'pequeño' | 'mediano' | 'grande';
  alineacion?: 'izquierda' | 'centro' | 'derecha';
  ajustarAlTexto?: boolean;
  deshabilitar?: boolean;
  cargando?: boolean;
  onClick?: () => void;
  onClickAsync?: () => Promise<void>; // Para operaciones async antes del redirect
  className?: string;
  target?: '_blank' | '_self'; // Para links externos
  'aria-label'?: string;
  // Props específicas para navegación
  replace?: boolean; // Para replace en lugar de push en el historial
  state?: any; // Para pasar state al componente destino
}

const BotonRedirect = ({
  href,
  texto,
  icono,
  tipo = 'primary',
  variante = 'solido',
  tamaño = 'mediano',
  alineacion = 'centro',
  ajustarAlTexto = false,
  deshabilitar = false,
  cargando = false,
  onClick,
  onClickAsync,
  className,
  target,
  replace = false,
  state,
  'aria-label': ariaLabel,
}: PropiedadBotonRedirect) => {
  const navigate = useNavigate();
  const [cargandoInterno, setCargandoInterno] = React.useState(false);
  
  // Determinar si está cargando (interno o externo)
  const estaCargando = cargando || cargandoInterno;
  
  // Clases base del botón
  const claseBase = [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'no-underline', // Para evitar subrayado del Link
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
    success: {
      solido: 'bg-green-500 hover:bg-green-600 text-white border-green-500 focus:ring-green-500',
      outline: 'border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500',
      ghost: 'text-green-500 hover:bg-green-50 border-transparent focus:ring-green-500',
    },
    delete: {
      solido: 'bg-red-500 hover:bg-red-600 text-white border-red-500 focus:ring-red-500',
      outline: 'border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-red-500 hover:bg-red-50 border-transparent focus:ring-red-500',
    },
    warning: {
      solido: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 focus:ring-yellow-500',
      outline: 'border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-500',
      ghost: 'text-yellow-500 hover:bg-yellow-50 border-transparent focus:ring-yellow-500',
    },
    info: {
      solido: 'bg-blue-400 hover:bg-blue-500 text-white border-blue-400 focus:ring-blue-400',
      outline: 'border-blue-400 text-blue-400 hover:bg-blue-50 focus:ring-blue-400',
      ghost: 'text-blue-400 hover:bg-blue-50 border-transparent focus:ring-blue-400',
    },
    gray: {
      solido: 'bg-gray-500 hover:bg-gray-600 text-white border-gray-500 focus:ring-gray-500',
      outline: 'border-gray-500 text-gray-500 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-500 hover:bg-gray-50 border-transparent focus:ring-gray-500',
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

  // Manejar click con lógica async
  const manejarClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si está deshabilitado o cargando, prevenir navegación
    if (deshabilitar || estaCargando) {
      e.preventDefault();
      return;
    }

    // Ejecutar onClick si existe
    if (onClick) {
      onClick();
    }

    // Ejecutar onClickAsync si existe
    if (onClickAsync) {
      e.preventDefault(); // Prevenir navegación inmediata
      setCargandoInterno(true);
      
      try {
        await onClickAsync();
        // Después de completar la operación async, navegar
        if (target === '_blank') {
          window.open(href, '_blank');
        } else {
          navigate(href, { replace, state });
        }
      } catch (error) {
        console.error('Error en operación async:', error);
        // Podrías mostrar un toast o notificación de error aquí
      } finally {
        setCargandoInterno(false);
      }
    }
  };

  // Componente del spinner de carga
  const SpinnerCarga = () => (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
    </svg>
  );

  // Contenido del botón
  const contenidoBoton = (
    <>
      {estaCargando && <SpinnerCarga />}
      {icono && !estaCargando && icono}
      {texto}
    </>
  );

  // Clases combinadas del botón
  const clasesBoton = combinarClases(
    ...claseBase,
    clasesTamaño[tamaño],
    clasesColor[tipo][variante],
    claseAncho,
    className
  );

  // Si es un link externo, usar un <a> normal
  if (href.startsWith('http') || target === '_blank') {
    const botonExterno = (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={manejarClick}
        className={clasesBoton}
        aria-label={ariaLabel || texto}
        aria-disabled={deshabilitar || estaCargando}
        style={{ 
          pointerEvents: deshabilitar || estaCargando ? 'none' : 'auto',
          textDecoration: 'none'
        }}
      >
        {contenidoBoton}
      </a>
    );

    return ajustarAlTexto ? botonExterno : (
      <div className={`flex ${clasesAlineacion[alineacion]}`}>
        {botonExterno}
      </div>
    );
  }

  // Para rutas internas, usar React Router Link
  const botonInterno = (
    <Link
      to={href}
      onClick={manejarClick}
      className={clasesBoton}
      aria-label={ariaLabel || texto}
      aria-disabled={deshabilitar || estaCargando}
      style={{ 
        pointerEvents: deshabilitar || estaCargando ? 'none' : 'auto',
        textDecoration: 'none'
      }}
      state={state}
      replace={replace}
    >
      {contenidoBoton}
    </Link>
  );

  return ajustarAlTexto ? botonInterno : (
    <div className={`flex ${clasesAlineacion[alineacion]}`}>
      {botonInterno}
    </div>
  );
};

export default BotonRedirect;