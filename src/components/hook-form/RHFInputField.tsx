import { Controller, useFormContext } from 'react-hook-form';

import CustomSelect from '../../shared/ui/CustomSelect';

type Option = {
  value: string;
  label: string;
};

type RHFInputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: Option[];
  min?: number;
  max?: number;
};

export const RHFInputField: React.FC<RHFInputFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  options = [],
  min,
  max,
}) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-1 p-2">
      <label className="font-extrabold text-gray-700 uppercase text-xs">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {type === 'textarea' ? (
              <textarea
                {...field}
                placeholder={placeholder}
                required={required}
                className={`
                  border-2 p-3 rounded-md transition-all 
                  ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                `}
              />
            ) : type === 'select' ? (
              <CustomSelect
                value={field.value}
                onChange={(val) => field.onChange(val)}
                options={options}
                placeholder={placeholder || 'Select...'}
              />
            ) : (
              <input
                {...field}
                type={type}
                placeholder={placeholder}
                required={required}
                min={min}
                max={max}
                className={`
                  border-2 p-3 rounded-md transition-all 
                  ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                `}
              />
            )}

            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
