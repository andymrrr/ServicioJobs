import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { PasoItemProps } from './types';
import { 
  obtenerClasesTextoTitulo, 
  obtenerClasesTextoDescripcion, 
  obtenerTamanoIcono,
  puedeNavegarAPaso,
  combinarClasesPersonalizadas
} from './utils';
import CirculoPaso from './CirculoPaso';
import LineaConectora from './LineaConectora';

const PasoItem: React.FC<PasoItemProps> = ({
  paso,
  indice,
  estado,
  esUltimo,
  tema,
  tamano,
  variante,
  mostrarDescripcion,
  mostrarNumeros,
  clickeable,
  animaciones,
  estilosPersonalizados,
  onClick
}) => {
  const esHorizontal = tema === 'horizontal';
  const tamanoIcono = obtenerTamanoIcono(tamano);
  
  // Determinar el contenido del círculo
  const obtenerContenidoCirculo = () => {
    if (estado === 'completado') {
      return <FaCheck size={tamanoIcono} />;
    }
    
    if (mostrarNumeros) {
      return paso.id;
    }
    
    if (paso.icono) {
      return paso.icono;
    }
    
    return paso.id;
  };

  // Determinar si el paso es clickeable
  const esClickeable = clickeable && !paso.deshabilitado;

  // Manejar click en el paso
  const handleClick = () => {
    if (esClickeable && onClick) {
      onClick(indice, paso);
    }
  };

  // Clases para los textos
  const clasesTitulo = combinarClasesPersonalizadas(
    obtenerClasesTextoTitulo(estado, variante, tamano),
    estilosPersonalizados?.titulo
  );

  const clasesDescripcion = combinarClasesPersonalizadas(
    obtenerClasesTextoDescripcion(tamano),
    estilosPersonalizados?.descripcion
  );

  if (esHorizontal) {
    return (
      <div className="flex items-center flex-1">
        <div className="flex flex-col items-center">
          {/* Círculo del paso */}
          <CirculoPaso
            estado={estado}
            contenido={obtenerContenidoCirculo()}
            variante={variante}
            tamano={tamano}
            clickeable={esClickeable}
            animaciones={animaciones}
            estilosPersonalizados={estilosPersonalizados}
            onClick={handleClick}
          />

          {/* Texto del paso */}
          <div className="mt-2 text-center">
            <p className={clasesTitulo}>
              {paso.titulo}
            </p>
            {mostrarDescripcion && paso.descripcion && (
              <p className={clasesDescripcion}>
                {paso.descripcion}
              </p>
            )}
          </div>
        </div>

        {/* Línea conectora horizontal */}
        {!esUltimo && (
          <LineaConectora
            activa={estado === 'completado'}
            orientacion="horizontal"
            variante={variante}
            tamano={tamano}
            estilosPersonalizados={estilosPersonalizados}
          />
        )}
      </div>
    );
  }

  // Versión vertical
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        {/* Círculo del paso */}
        <CirculoPaso
          estado={estado}
          contenido={obtenerContenidoCirculo()}
          variante={variante}
          tamano={tamano}
          clickeable={esClickeable}
          animaciones={animaciones}
          estilosPersonalizados={estilosPersonalizados}
          onClick={handleClick}
        />

        {/* Línea vertical conectora */}
        {!esUltimo && (
          <LineaConectora
            activa={estado === 'completado'}
            orientacion="vertical"
            variante={variante}
            tamano={tamano}
            estilosPersonalizados={estilosPersonalizados}
          />
        )}
      </div>

      <div className="flex flex-col pb-8">
        <h3 className={clasesTitulo}>
          {paso.titulo}
        </h3>
        {mostrarDescripcion && paso.descripcion && (
          <p className={clasesDescripcion}>
            {paso.descripcion}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasoItem; 