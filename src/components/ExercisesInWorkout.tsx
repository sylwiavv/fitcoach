'use client';

import { useParams } from 'next/navigation';

import { CompletedIcon, UnCheckedIcon } from '../shell/assets/icons';
import { useMarkExerciseCompleted, useWorkoutExercises } from '../entities/workout';

export const ExercisesInWorkout = () => {
  const params = useParams();
  const clientId = typeof params.clientId === 'string' ? params.clientId : undefined;
  const date = typeof params.date === 'string' ? params.date : undefined;

  if (!clientId || !date) return <div>Client or date not found</div>;

  const { data: workoutExercises = [] } = useWorkoutExercises(clientId, date);
  const markExerciseCompleted = useMarkExerciseCompleted();

  const handleToggleExercise = (exerciseId: string, completed: boolean) => {
    markExerciseCompleted.mutate({ exerciseId, completed });
  };

  return (
    <ul className="flex flex-col gap-2 mb-4">
      <h2 className="text-xl font-semibold">Exercises in workout:</h2>

      {workoutExercises.map((ex) => (
        <li key={ex.id} className="flex justify-between items-center">
          <span>
            {ex.exercise?.name} — {ex.sets}×{ex.reps} {ex.load ? `, ${ex.load}kg` : ''}
          </span>

          <button
            type="button"
            onClick={() => handleToggleExercise(ex.id, !ex.completed)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {ex.completed ? <CompletedIcon /> : <UnCheckedIcon />}
          </button>
        </li>
      ))}
    </ul>
  );
};
