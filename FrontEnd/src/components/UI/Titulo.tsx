import React from 'react';
interface Propiedad {
  children: React.ReactNode; 
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; 
}

const Titulo = ({ children, level = 'h4'}: Propiedad) => {
  const Tag = level; 
  return (
    <Tag className={`mb-6 text-xl font-semibold text-black dark:text-white`}>
      {children}
    </Tag>
  );
};

export default Titulo;
