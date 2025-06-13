// import React from 'react';

interface Propiedad {
  size?: 1 | 2 | 4 | 8; 
  axis?: 'horizontal' | 'vertical'; 
}

const Espacio = ({ size = 4, axis = 'vertical' }: Propiedad) => {
  
  const spacerClass = axis === 'horizontal' ? `w-${size}` : `h-${size}`;

  return <div className={spacerClass} />;
};

export default Espacio;
