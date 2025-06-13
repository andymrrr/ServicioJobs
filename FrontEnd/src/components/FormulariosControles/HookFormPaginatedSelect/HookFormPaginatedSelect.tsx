import { useState, useEffect, useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { PaginatedSelectProps, SelectOption } from './types';
import { 
  getColSpanClass, 
  buildSelectRegisterOptions, 
  debounce, 
  // findOptionByValue,
  defaultTransformData,
  validateApiResponse
} from './utils';
import SelectLabel from './SelectLabel';
import SelectDropdown from './SelectDropdown';
import ErrorMessage from './ErrorMessage';

const HookFormPaginatedSelect = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  disabled = false,
  tooltipMessage,
  required,
  colSpan = '6',
  
  // Props específicas para paginación
  fetchData,
  transformData = defaultTransformData,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  itemsPerPage = 20,
  minSearchLength = 0,
  debounceDelay = 300,
  
  // Props para personalización
  noOptionsMessage = 'No se encontraron opciones',
  loadingMessage = 'Cargando...',
  searchingMessage = 'Buscando...',
  
  // Props opcionales
  allowClear = true,
  showSearch = true
}: PaginatedSelectProps<T>) => {
  
  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Props para React Hook Form
  const registerOptions = buildSelectRegisterOptions({ required });
  const colSpanClass = getColSpanClass(colSpan);
  const hasError = !!errors[name];
  const { onChange, ...registerProps } = register(name, registerOptions);

  // Función para cargar datos de la API
  const loadData = useCallback(async (
    search?: string, 
    page = 1, 
    append = false
  ) => {
    try {
      const shouldSearch = !search || search.length >= minSearchLength;
      if (!shouldSearch) return;

      if (search) {
        setIsSearching(true);
      } else {
        setIsLoading(true);
      }

      const response = await fetchData(search, page, itemsPerPage);
      
      if (!validateApiResponse(response)) {
        console.warn('Invalid API response structure');
        return;
      }

      const transformedData = response.data.map(transformData);
      
      if (append) {
        setOptions(prev => [...prev, ...transformedData]);
      } else {
        setOptions(transformedData);
      }

      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
      setHasNextPage(response.pagination.hasNextPage);
    } catch (error) {
      console.error('Error loading data:', error);
      setOptions([]);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [fetchData, transformData, itemsPerPage, minSearchLength]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setCurrentPage(1);
      loadData(term, 1, false);
    }, debounceDelay),
    [loadData, debounceDelay]
  );

  // Efectos
  useEffect(() => {
    // Cargar datos iniciales
    loadData();
  }, [loadData]);

  useEffect(() => {
    // Ejecutar búsqueda cuando cambie el término
    if (searchTerm !== '') {
      debouncedSearch(searchTerm);
    } else {
      // Si se borra la búsqueda, recargar datos iniciales
      setCurrentPage(1);
      loadData('', 1, false);
    }
  }, [searchTerm, debouncedSearch, loadData]);

  // Handlers
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleOptionSelect = (option: SelectOption) => {
    setSelectedOption(option);
    onChange({ target: { value: option.value } }); // Notificar a React Hook Form
  };

  const handleClear = () => {
    setSelectedOption(null);
    onChange({ target: { value: '' } }); // Notificar a React Hook Form
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      loadData(searchTerm, currentPage + 1, true);
    }
  };

  // Sincronizar valor inicial desde React Hook Form
  useEffect(() => {
    // registerProps no tiene value directamente, necesitamos usar watch o getValues
    // Por ahora omitimos esta funcionalidad para evitar el error
  }, [options, selectedOption]);

  return (
    <div className={colSpanClass}>
      <SelectLabel 
        label={label} 
        tooltipMessage={tooltipMessage} 
      />
      
      <SelectDropdown
        isOpen={isOpen}
        onToggle={handleToggle}
        onClear={allowClear ? handleClear : undefined}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        options={options}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
        isLoading={isLoading}
        isSearching={isSearching}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        onLoadMore={handleLoadMore}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        disabled={disabled}
        hasError={hasError}
        allowClear={allowClear}
        showSearch={showSearch}
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        searchingMessage={searchingMessage}
      />
      
      {/* Input oculto para React Hook Form */}
      <input
        type="hidden"
        {...registerProps}
      />
      
      <ErrorMessage 
        name={name} 
        errors={errors} 
      />
    </div>
  );
};

export default HookFormPaginatedSelect; 