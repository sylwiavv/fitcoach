import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useWorkoutExercises } from '../../entities/exercises/api';

const AddWorkoutPage: React.FC = () => {
  const { clientId, date } = useParams<{ clientId: string; date: string }>();

  if (!clientId || !date) return <div>Missing client or date</div>;

  const { data: exercises, isLoading, isError } = useWorkoutExercises(clientId, date);

  const workoutDate = dayjs(date).toDate();

  if (isLoading) return <div>Loading exercises...</div>;
  if (isError) return <div className="text-red-500">Error fetching exercises</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Workout for: {workoutDate.toLocaleDateString('en-US')}
      </h1>

      <h2 className="text-xl font-semibold mb-4">Planned exercises for the day</h2>

      {exercises?.length === 0 && <p className="text-gray-500">No exercises planned</p>}

      <ul className="space-y-2">
        {exercises?.map((ex) => (
          <li key={ex.id} className="p-2 border rounded-lg shadow-sm bg-white">
            <strong>{ex.exercise?.name}</strong>
            <div>
              {ex.sets} sets × {ex.reps} reps
            </div>
            <div>Load: {ex.load} kg</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddWorkoutPage;
