import React, { useCallback, useMemo } from 'react';
import { StepByStepProps } from './types';
import { obtenerEstadoPaso, puedeNavegarAPaso, combinarClasesPersonalizadas } from './utils';
import PasoItem from './PasoItem';

const StepByStep: React.FC<StepByStepProps> = ({
  pasos,
  pasoActual,
  onPasoClick,
  mostrarDescripcion = true,
  tema = 'horizontal',
  tamano = 'medium',
  variante = 'primary',
  permitirRetroceso = true,
  mostrarNumeros = false,
  estilosPersonalizados,
  className = '',
  animaciones = true,
  onCambioPaso
}) => {
  // Validaciones
  const pasosValidos = useMemo(() => {
    if (!Array.isArray(pasos) || pasos.length === 0) {
      console.warn('StepByStep: Se requiere un array de pasos no vacío');
      return [];
    }
    return pasos;
  }, [pasos]);

  const pasoActualValido = useMemo(() => {
    const pasoClamp = Math.max(0, Math.min(pasoActual, pasosValidos.length - 1));
    if (pasoClamp !== pasoActual) {
      console.warn(`StepByStep: pasoActual (${pasoActual}) está fuera del rango válido. Usando ${pasoClamp}`);
    }
    return pasoClamp;
  }, [pasoActual, pasosValidos.length]);

  // Manejar click en paso
  const handlePasoClick = useCallback((indicePaso: number, paso: any) => {
    const puedeNavegar = puedeNavegarAPaso(
      indicePaso,
      pasoActualValido,
      permitirRetroceso,
      paso.deshabilitado || false
    );

    if (!puedeNavegar) {
      return;
    }

    // Notificar cambio de paso si es diferente
    if (indicePaso !== pasoActualValido && onCambioPaso) {
      onCambioPaso(pasoActualValido, indicePaso);
    }

    // Ejecutar callback de click
    if (onPasoClick) {
      onPasoClick(indicePaso, paso);
    }
  }, [pasoActualValido, permitirRetroceso, onPasoClick, onCambioPaso]);

  // Determinar si un paso es clickeable
  const esPasoClickeable = useCallback((indicePaso: number, paso: any) => {
    if (!onPasoClick) return false;
    return puedeNavegarAPaso(
      indicePaso,
      pasoActualValido,
      permitirRetroceso,
      paso.deshabilitado || false
    );
  }, [onPasoClick, pasoActualValido, permitirRetroceso]);

  // Clases del contenedor principal
  const clasesContenedor = useMemo(() => {
    const clasesBase = tema === 'horizontal' 
      ? 'w-full' 
      : 'flex flex-col';
    
    return combinarClasesPersonalizadas(
      clasesBase,
      estilosPersonalizados?.contenedor
    );
  }, [tema, estilosPersonalizados?.contenedor]);

  // Clases del contenedor de pasos
  const clasesContenedorPasos = tema === 'horizontal' 
    ? 'flex items-center justify-between'
    : 'flex flex-col';

  // Si no hay pasos válidos, no renderizar nada
  if (pasosValidos.length === 0) {
    return null;
  }

  return (
    <div 
      className={`${clasesContenedor} ${className}`.trim()}
      role="progressbar"
      aria-valuenow={pasoActualValido + 1}
      aria-valuemin={1}
      aria-valuemax={pasosValidos.length}
      aria-label={`Paso ${pasoActualValido + 1} de ${pasosValidos.length}: ${pasosValidos[pasoActualValido]?.titulo || ''}`}
    >
      <div className={clasesContenedorPasos}>
        {pasosValidos.map((paso, indice) => {
          const estado = obtenerEstadoPaso(indice, pasoActualValido);
          const esUltimo = indice === pasosValidos.length - 1;
          const clickeable = esPasoClickeable(indice, paso);

          return (
            <PasoItem
              key={`paso-${paso.id}-${indice}`}
              paso={paso}
              indice={indice}
              estado={estado}
              esUltimo={esUltimo}
              tema={tema}
              tamano={tamano}
              variante={variante}
              mostrarDescripcion={mostrarDescripcion}
              mostrarNumeros={mostrarNumeros}
              clickeable={clickeable}
              animaciones={animaciones}
              estilosPersonalizados={estilosPersonalizados}
              onClick={handlePasoClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepByStep; 