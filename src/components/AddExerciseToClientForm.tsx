import React, { useState } from 'react';

import { useExercises } from '../entities/exercises/model/queries';
import { useAssignExerciseToClient } from '../entities/workout';
import { InputField } from '../shared/ui/InputFIeld';
import PrimaryButton from './PrimaryButton';

type Props = {
  clientId: string;
  date: string;
};

const AddExerciseToClient: React.FC<Props> = ({ clientId, date }) => {
  const { data: exercisesData, isLoading, isError, error } = useExercises();
  const mutation = useAssignExerciseToClient();

  const [form, setForm] = useState({
    exerciseId: '',
    sets: 3,
    reps: 10,
    load: 0,
    notes: '',
  });

  const update = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ clientId, date, ...form });
  };

  if (isLoading) return <div>Loading exercises...</div>;
  if (isError)
    return <div className="text-red-500">Error fetching exercises: {(error as Error).message}</div>;

  const numericFields = [
    { key: 'sets', label: 'Sets', type: 'number', min: 1 },
    { key: 'reps', label: 'Reps', type: 'number', min: 1 },
    { key: 'load', label: 'Load (kg)', type: 'number', min: 0 },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Exercise"
        type="select"
        value={form.exerciseId}
        onChange={(value) => update('exerciseId', value)}
        required
        placeholder="Select exercise..."
        options={exercisesData?.map((ex) => ({
          value: ex.id,
          label: ex.name,
        }))}
      />

      {form.exerciseId && (
        <>
          {numericFields.map((f) => (
            <InputField
              key={f.key}
              label={f.label}
              type={f.type as 'number'}
              value={form[f.key as keyof typeof form] as number}
              onChange={(val) => update(f.key, val)}
              min={f.min}
            />
          ))}

          <InputField
            label="Notes"
            type="textarea"
            value={form.notes}
            onChange={(val) => update('notes', val)}
            placeholder="Optional notes..."
          />
        </>
      )}

      <PrimaryButton type="submit">
        <b>+</b> Add Exercise to Workout
      </PrimaryButton>
    </form>
  );
};

export default AddExerciseToClient;
