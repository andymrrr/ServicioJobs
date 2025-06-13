import React, { useRef, useEffect } from 'react';
import { SelectDropdownProps } from './types';
import { getDropdownClasses, getSearchInputClasses, getSelectClasses } from './utils';
import SelectOptionItem from './SelectOptionItem';
import LoadingIndicator from './LoadingIndicator';
import LoadMoreButton from './LoadMoreButton';

const SelectDropdown = ({
  isOpen,
  onToggle,
  onClear,
  searchTerm,
  onSearchChange,
  options,
  selectedOption,
  onOptionSelect,
  isLoading,
  isSearching,
  // currentPage,
  // totalPages,
  hasNextPage,
  onLoadMore,
  placeholder,
  searchPlaceholder,
  disabled,
  hasError,
  allowClear,
  showSearch,
  noOptionsMessage,
  loadingMessage,
  searchingMessage
}: SelectDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  // Enfocar input de búsqueda cuando se abra el dropdown
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, showSearch]);

  const handleSelectClick = () => {
    if (!disabled) {
      onToggle();
    }
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleOptionSelect = (option: any) => {
    onOptionSelect(option);
    onToggle(); // Cerrar dropdown después de seleccionar
  };

  // Determinar qué mostrar en el select
  const displayValue = selectedOption ? selectedOption.label : placeholder || 'Seleccionar...';
  const hasValue = !!selectedOption;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Campo del select */}
      <div
        className={getSelectClasses(hasError, disabled, isOpen)}
        onClick={handleSelectClick}
      >
        <span className={`flex-1 ${hasValue ? 'text-black dark:text-white' : 'text-gray-400'}`}>
          {displayValue}
        </span>
        
        <div className="flex items-center space-x-2">
          {/* Botón de limpiar */}
          {allowClear && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClearClick}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Icono de dropdown */}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      <div className={getDropdownClasses(isOpen)}>
        {/* Campo de búsqueda */}
        {showSearch && (
          <div className="sticky top-0 bg-white dark:bg-form-input z-10">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder || 'Buscar...'}
              className={getSearchInputClasses()}
            />
          </div>
        )}

        {/* Contenido del dropdown */}
        <div className="max-h-48 overflow-y-auto">
          {/* Estado de búsqueda */}
          {isSearching ? (
            <LoadingIndicator message={searchingMessage} />
          ) : /* Estado de carga inicial */
          isLoading && options.length === 0 ? (
            <LoadingIndicator message={loadingMessage} />
          ) : /* No hay opciones */
          options.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              {noOptionsMessage}
            </div>
          ) : /* Lista de opciones */
          (
            <>
              {options.map((option) => (
                <SelectOptionItem
                  key={option.value}
                  option={option}
                  isSelected={selectedOption?.value === option.value}
                  onSelect={handleOptionSelect}
                />
              ))}
            </>
          )}
        </div>

        {/* Botón de cargar más */}
        {!isSearching && options.length > 0 && (
          <LoadMoreButton
            onLoadMore={onLoadMore}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default SelectDropdown; 