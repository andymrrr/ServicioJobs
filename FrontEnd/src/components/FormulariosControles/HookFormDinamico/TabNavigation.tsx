import React from 'react';
import { TabNavigationProps } from './types';

const TabNavigation: React.FC<TabNavigationProps> = ({
  pestañas,
  pestañaActiva,
  onTabChange,
  fieldArrays
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8">
        {pestañas.map((pestaña) => {
          const fieldArrayPestaña = fieldArrays[pestaña];
          const camposPestaña = fieldArrayPestaña?.fields || [];
          
          return (
            <button
              key={pestaña}
              type="button"
              onClick={() => onTabChange(pestaña)}
              className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                pestañaActiva === pestaña
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {pestaña}
              {camposPestaña.length > 0 && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {camposPestaña.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation; 