import React from 'react';
import { CirculoPasoProps } from './types';
import { obtenerClasesCirculo, combinarClasesPersonalizadas } from './utils';

const CirculoPaso: React.FC<CirculoPasoProps> = ({
  estado,
  contenido,
  variante,
  tamano,
  clickeable,
  animaciones,
  estilosPersonalizados,
  onClick
}) => {
  const clasesBase = obtenerClasesCirculo(
    estado,
    variante,
    tamano,
    clickeable,
    animaciones
  );

  const clasesFinales = combinarClasesPersonalizadas(
    clasesBase,
    estilosPersonalizados?.circulo
  );

  const handleClick = () => {
    if (clickeable && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={clasesFinales}
      onClick={handleClick}
      role={clickeable ? 'button' : undefined}
      tabIndex={clickeable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickeable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Paso ${estado}`}
    >
      {contenido}
    </div>
  );
};

export default CirculoPaso; 