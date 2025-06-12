import { FieldValues, Controller } from 'react-hook-form';

/**
    * Wrapper simplificado para el Controller de react-hook-form
 */
export const SelectController = <T extends FieldValues>({
  control,
  name,
  rules,
  render
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={render}
    />
  );
};

export default SelectController; 