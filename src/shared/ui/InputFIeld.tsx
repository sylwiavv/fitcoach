'use client';

import React from 'react';

import CustomSelect from './CustomSelect';

type Option = {
  value: string;
  label: string;
};

type InputFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: Option[];
  min?: number;
  max?: number;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  options = [],
}) => {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-extrabold text-gray-700 uppercase text-xs pl-1">{label}</span>

      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      ) : type === 'select' ? (
        <CustomSelect
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder || 'Select...'}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      )}
    </label>
  );
};
