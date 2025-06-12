import { FileFieldOnlyProps } from './types';
import { getFileInputClasses } from './utils';

/**
 * Componente para renderizar el campo de input file oculto
 */
export const FileField: React.FC<FileFieldOnlyProps> = ({
  name,
  accept,
  multiple,
  registerProps
}) => {
  const inputClasses = getFileInputClasses();

  return (
    <label className="hidden">
      <input
        type="file"
        id={name}
        accept={accept}
        multiple={multiple}
        className={inputClasses}
        {...registerProps}
      />
    </label>
  );
};

export default FileField; 