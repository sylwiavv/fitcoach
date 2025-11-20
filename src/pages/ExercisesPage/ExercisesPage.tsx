import React from 'react';

import { useExercises } from '../../entities/exercises/api';

export const ExercisesPage: React.FC = () => {
  const { data: exercises = [], isLoading, isError, error } = useExercises();

  if (isLoading) return <div>Loading exercises...</div>;
  if (isError)
    return <div className="text-red-500">Error fetching exercises: {(error as Error).message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Exercises</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center bg-white"
          >
            {exercise.image_url ? (
              <img
                src={exercise.image_url}
                alt={exercise.name}
                className="w-32 h-32 object-cover rounded mb-2"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded mb-2">
                No image
              </div>
            )}
            <h2 className="font-semibold text-lg text-center">{exercise.name}</h2>
            {exercise.notes && <p className="text-gray-500 text-sm mt-1">{exercise.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
