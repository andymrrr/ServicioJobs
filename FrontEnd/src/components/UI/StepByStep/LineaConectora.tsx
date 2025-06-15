import React from 'react';
import { LineaConectoraProps } from './types';
import { obtenerClasesLinea, combinarClasesPersonalizadas } from './utils';

const LineaConectora: React.FC<LineaConectoraProps> = ({
  activa,
  orientacion,
  variante,
  tamano,
  estilosPersonalizados
}) => {
  const clasesBase = obtenerClasesLinea(activa, orientacion, variante, tamano);
  
  const clasesFinales = combinarClasesPersonalizadas(
    clasesBase,
    estilosPersonalizados?.linea
  );

  const contenedorClases = orientacion === 'horizontal' 
    ? 'flex-1 mx-4 mb-8 flex items-center'
    : 'mt-2 flex justify-center';

  return (
    <div className={contenedorClases}>
      <div 
        className={clasesFinales}
        role="separator"
        aria-hidden="true"
      />
    </div>
  );
};

export default LineaConectora; 