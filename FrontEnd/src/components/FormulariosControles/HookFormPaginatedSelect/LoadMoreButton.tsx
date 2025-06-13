import { LoadMoreButtonProps } from './types';

const LoadMoreButton = ({ onLoadMore, hasNextPage, isLoading }: LoadMoreButtonProps) => {
  if (!hasNextPage) return null;
  
  return (
    <div className="px-4 py-3 border-t border-stroke dark:border-form-strokedark">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoading}
        className="w-full py-2 px-4 text-sm font-medium text-primary bg-transparent border border-primary rounded hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            <span>Cargando...</span>
          </>
        ) : (
          <>
            <span>Cargar más</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton; 