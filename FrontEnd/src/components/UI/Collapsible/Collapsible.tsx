import React, { useState, ReactNode } from 'react';

export interface CollapsibleProps {
  // Contenido
  title: string;
  subtitle?: string;
  children: ReactNode;
  
  // Estado inicial
  defaultOpen?: boolean;
  
  // Estilos y apariencia
  variant?: 'default' | 'card' | 'minimal' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  
  // Colores
  headerColor?: 'gray' | 'blue' | 'green' | 'purple' | 'orange' | 'red';
  
  // Iconos
  icon?: string | ReactNode;
  expandIcon?: 'arrow' | 'plus' | 'chevron';
  
  // Comportamiento
  disabled?: boolean;
  animated?: boolean;
  
  // Callbacks
  onToggle?: (isOpen: boolean) => void;
  
  // Clases CSS personalizadas
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  subtitle,
  children,
  defaultOpen = false,
  variant = 'default',
  size = 'md',
  headerColor = 'gray',
  icon,
  expandIcon = 'arrow',
  disabled = false,
  animated = true,
  onToggle,
  className = '',
  headerClassName = '',
  contentClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (disabled) return;
    
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  // Estilos base según variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm';
      case 'minimal':
        return 'border-b border-gray-200 dark:border-gray-600';
      case 'bordered':
        return 'border border-gray-200 dark:border-gray-600 rounded-lg';
      default:
        return 'bg-gradient-to-r rounded-xl border';
    }
  };

  // Estilos de color para el header
  const getHeaderColorStyles = () => {
    const baseStyles = 'transition-colors duration-200';
    
    if (variant === 'minimal') {
      return `${baseStyles} hover:bg-gray-50 dark:hover:bg-gray-700`;
    }

    switch (headerColor) {
      case 'blue':
        return `${baseStyles} from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-gray-700 dark:hover:to-gray-600`;
      case 'green':
        return `${baseStyles} from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-green-200 dark:border-gray-600 hover:from-green-100 hover:to-emerald-100 dark:hover:from-gray-700 dark:hover:to-gray-600`;
      case 'purple':
        return `${baseStyles} from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-700 border-purple-200 dark:border-gray-600 hover:from-purple-100 hover:to-violet-100 dark:hover:from-gray-700 dark:hover:to-gray-600`;
      case 'orange':
        return `${baseStyles} from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 border-orange-200 dark:border-gray-600 hover:from-orange-100 hover:to-amber-100 dark:hover:from-gray-700 dark:hover:to-gray-600`;
      case 'red':
        return `${baseStyles} from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 border-red-200 dark:border-gray-600 hover:from-red-100 hover:to-pink-100 dark:hover:from-gray-700 dark:hover:to-gray-600`;
      default:
        return `${baseStyles} from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 hover:from-gray-100 hover:to-slate-100 dark:hover:from-gray-700 dark:hover:to-gray-600`;
    }
  };

  // Estilos de tamaño
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'p-4 text-sm';
      case 'lg':
        return 'p-8 text-lg';
      default:
        return 'p-6 text-base';
    }
  };

  // Icono de expansión
  const getExpandIcon = () => {
    const iconClass = `transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`;
    
    switch (expandIcon) {
      case 'plus':
        return (
          <span className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
            +
          </span>
        );
      case 'chevron':
        return (
          <span className={iconClass}>
            ⌄
          </span>
        );
      default:
        return (
          <span className={iconClass}>
            ▼
          </span>
        );
    }
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      {/* Header */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          w-full text-left flex items-center justify-between
          ${getSizeStyles()}
          ${variant !== 'minimal' ? getHeaderColorStyles() : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
          ${variant === 'card' || variant === 'default' ? 'rounded-xl' : ''}
          ${variant === 'bordered' ? 'rounded-t-lg' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${headerClassName}
        `}
      >
        <div className="flex items-center space-x-3">
          {/* Icono opcional */}
          {icon && (
            <span className="text-xl">
              {typeof icon === 'string' ? icon : icon}
            </span>
          )}
          
          {/* Título y subtítulo */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Icono de expansión */}
        <div className="flex-shrink-0">
          {getExpandIcon()}
        </div>
      </button>

      {/* Contenido */}
      {isOpen && (
        <div 
          className={`
            ${variant === 'minimal' ? 'pt-4' : 'px-6 pb-6'}
            ${variant === 'minimal' ? '' : 'border-t border-gray-200 dark:border-gray-600'}
            ${animated ? 'animate-fadeIn' : ''}
            ${contentClassName}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible; 