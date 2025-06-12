import { ClearButtonProps } from './types';

/**
 * Componente botón para limpiar la selección
 */
export const ClearButton: React.FC<ClearButtonProps> = ({ onClear, disabled = false }) => {
  if (disabled) return null;

  return (
    <button
      type="button"
      onClick={onClear}
      className="absolute top-1/2 right-8 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer z-20 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-1"
      aria-label="Limpiar selección"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default ClearButton; 