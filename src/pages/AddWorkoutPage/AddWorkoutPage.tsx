import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useClients } from '../../entities/client/api';
import { useExercises } from '../../entities/exercises/api';
import type { Exercise } from '../../entities/exercises/types';
import { useAddWorkout } from '../../entities/workouts/api';
import type { NewWorkoutExercise } from '../../entities/workouts/types';

export const AddWorkoutPage: React.FC = () => {
  const { clientId: routeClientId } = useParams<{ clientId: string }>();

  const { data: clients = [] } = useClients();
  const { data: exercises = [] } = useExercises();
  const mutation = useAddWorkout();

  const [clientId, setClientId] = useState(routeClientId ?? '');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedExercises, setSelectedExercises] = useState<NewWorkoutExercise[]>([]);

  const toggleExercise = (exerciseId: string) => {
    setSelectedExercises((prev) => {
      if (prev.find((ex) => ex.exerciseId === exerciseId)) {
        return prev.filter((ex) => ex.exerciseId !== exerciseId);
      }
      return [...prev, { exerciseId, sets: 3, reps: 10, load: 0 }];
    });
  };

  const handleChange = (exerciseId: string, field: keyof NewWorkoutExercise, value: number) => {
    setSelectedExercises((prev) =>
      prev.map((ex) => (ex.exerciseId === exerciseId ? { ...ex, [field]: value } : ex)),
    );
  };

  const handleSubmit = () => {
    if (!clientId || selectedExercises.length === 0) {
      alert('Select a client and at least one exercise');
      return;
    }

    mutation.mutate({ clientId, date, exercises: selectedExercises });
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Add Workout</h1>

      <label>
        Client:
        <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
          <option value="">Select a client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <div>
        <h2 className="font-semibold">Exercises</h2>
        {exercises.map((ex: Exercise) => {
          const selected = selectedExercises.find((s) => s.exerciseId === ex.id);

          return (
            <div key={ex.id} className="flex items-center gap-2">
              <input type="checkbox" checked={!!selected} onChange={() => toggleExercise(ex.id)} />
              <span>{ex.name}</span>

              {selected && (
                <>
                  <input
                    type="number"
                    min={0}
                    value={selected.sets}
                    onChange={(e) => handleChange(ex.id, 'sets', Number(e.target.value))}
                    className="w-12"
                  />

                  <input
                    type="number"
                    min={0}
                    value={selected.reps}
                    onChange={(e) => handleChange(ex.id, 'reps', Number(e.target.value))}
                    className="w-12"
                  />

                  <input
                    type="number"
                    min={0}
                    value={selected.load}
                    onChange={(e) => handleChange(ex.id, 'load', Number(e.target.value))}
                    className="w-16"
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={mutation.isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {mutation.isPending ? 'Saving...' : 'Add Workout'}
      </button>
    </div>
  );
};
