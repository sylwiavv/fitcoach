import { useParams } from 'react-router-dom';

import { CompletedIcon, UnCheckedIcon } from '../app/assets';
import { useWorkoutExercises } from '../entities/exercises/api';
import { useMarkExerciseCompleted } from '../entities/workouts/api';

export const ExercisesInWorkout = () => {
  const { clientId, date } = useParams<{ clientId: string; date: string }>();

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

          <label className="cursor-pointer relative flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!ex.completed}
              onChange={(e) => handleToggleExercise(ex.id, e.target.checked)}
              className="sr-only"
            />
            <span className="select-none">{ex.completed ? 'Completed' : 'Uncompleted'}</span>

            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-eerie-black">
              {ex.completed ? <CompletedIcon /> : <UnCheckedIcon />}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};
