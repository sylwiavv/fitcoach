import React, { useState } from 'react';

import { useAddExercise } from '../entities/exercises/api';

const AddExerciseForm: React.FC = () => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');

  const mutation = useAddExercise();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      name,
      notes: notes || null,
      image_url: image || null,
    });

    setName('');
    setNotes('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Exercise name"
        required
        className="border p-2 rounded"
      />

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        className="border p-2 rounded"
      />

      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL (optional)"
        className="border p-2 rounded"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Exercise
      </button>
    </form>
  );
};

export default AddExerciseForm;
