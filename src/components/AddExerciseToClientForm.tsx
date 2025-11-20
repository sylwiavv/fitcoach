import React, { useState } from 'react';

import { useAssignExerciseToClient } from '../entities/workouts/api';

type Props = {
  clientId: string;
  date: string;
  exercises: { id: string; name: string }[];
};

const AddExerciseToClient: React.FC<Props> = ({ clientId, date, exercises }) => {
  const [exerciseId, setExerciseId] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [load, setLoad] = useState(0);
  const [notes, setNotes] = useState('');

  const mutation = useAssignExerciseToClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      clientId,
      date,
      exerciseId,
      sets,
      reps,
      load,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      <select
        value={exerciseId}
        onChange={(e) => setExerciseId(e.target.value)}
        required
        className="border p-2 rounded"
      >
        <option value="">Select exercise...</option>
        {exercises.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={sets}
        onChange={(e) => setSets(Number(e.target.value))}
        min={1}
        className="border p-2 rounded"
        placeholder="Sets"
      />

      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(Number(e.target.value))}
        min={1}
        className="border p-2 rounded"
        placeholder="Reps"
      />

      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(Number(e.target.value))}
        min={0}
        className="border p-2 rounded"
        placeholder="Load (kg)"
      />

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-2 rounded"
        placeholder="Notes (optional)"
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Exercise to Client
      </button>
    </form>
  );
};

export default AddExerciseToClient;
