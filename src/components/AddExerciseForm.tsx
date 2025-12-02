import React, { useState } from 'react';

import { useAddExercise } from '../entities/exercises/model/queries';
import { InputField } from '../shared/ui/InputFIeld';
import PrimaryButton from './PrimaryButton';

const AddExerciseForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', notes: '', image: '' });
  const mutation = useAddExercise();

  const fields = [
    {
      name: 'name',
      label: 'Exercise Name',
      type: 'text',
      placeholder: 'Exercise name',
      required: true,
    },
    { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Notes (optional)' },
    { name: 'image', label: 'Image URL', type: 'text', placeholder: 'Image URL (optional)' },
  ];

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: form.name,
      notes: form.notes || null,
      image_url: form.image || null,
    });
    setForm({ name: '', notes: '', image: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col gap-4 max-w-sm relative

      `}
    >
      {fields.map((f) => (
        <InputField
          key={f.name}
          label={f.label}
          value={form[f.name as keyof typeof form]}
          onChange={(val) => handleChange(f.name, val)}
          placeholder={f.placeholder}
          type={f.type as 'text' | 'textarea'}
          required={f.required}
        />
      ))}
      <PrimaryButton>
        <b>+</b> Add Exercise
      </PrimaryButton>
    </form>
  );
};

export default AddExerciseForm;
