import { LoadingIndicatorProps } from './types';

const LoadingIndicator = ({ message }: LoadingIndicatorProps) => {
  return (
    <div className="px-4 py-6 flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{message}</span>
      </div>
    </div>
  );
};

export default LoadingIndicator; 