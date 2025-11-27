import React from 'react';
import { useParams } from 'react-router-dom';

import { CompletedIcon, UnCheckedIcon } from '../../app/assets';
import AddExerciseToClientForm from '../../components/AddExerciseToClientForm';
import { ExercisesInWorkout } from '../../components/ExercisesInWorkout';
import TwoColorAvatar from '../../components/TwoColorAvatar';
import { useClient } from '../../entities/clients/model/queries';
import { useMarkWorkoutCompleted, useWorkout, useWorkoutExercises } from '../../entities/workout';

const AddExerciseToClientPage: React.FC = () => {
  const { clientId, date } = useParams<{ clientId: string; date: string }>();

  if (!clientId || !date) return <div>Client or date not found</div>;

  const { data: workoutExercises = [] } = useWorkoutExercises(clientId, date);
  const { data: workout } = useWorkout(clientId, date);
  const { data: client } = useClient(clientId);
  const { avatar, name } = client || {};

  const markWorkoutCompleted = useMarkWorkoutCompleted();

  const handleToggleWorkout = (completed: boolean) => {
    if (!workout) return;
    markWorkoutCompleted.mutate({ workoutId: workout.id, completed });
  };

  return (
    <div className="container">
      <div className="mb-4 flex justify-between">
        <div className="flex items-center gap-4 ">
          {avatar && <TwoColorAvatar avatar={avatar} size={100} />}
          <h1 className="text-2xl font-bold mb-6 text-eerieBlack">{name}</h1>
        </div>
        <div>
          <span className="text-xl">Workout</span>
          <h1 className="text-3xl font-bold">{date}</h1>
        </div>
      </div>

      <div className="f7f6f9">
        {workout && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-vanilla rounded-md">
            <span className="font-medium">
              {workout.completed ? 'Workout completed' : 'Workout uncompleted'}
            </span>

            <input
              type="checkbox"
              checked={!!workout.completed}
              onChange={(e) => handleToggleWorkout(e.target.checked)}
              className="sr-only"
              id="workout-completed-checkbox"
            />

            <label htmlFor="workout-completed-checkbox" className="cursor-pointer relative">
              <div className="w-6 h-6 flex items-center justify-center border rounded-full bg-eerie-black">
                {workout.completed ? <CompletedIcon /> : <UnCheckedIcon />}
              </div>
            </label>
          </div>
        )}

        <div className={`p-6 rounded-md ${workout?.completed ? 'bg-honey-dew' : 'bg-vanilla'}`}>
          {workoutExercises.length === 0 ? (
            <p className="text-gray-500">No exercises yet.</p>
          ) : (
            <ExercisesInWorkout />
          )}
        </div>
        <h2 className="text-xl font-semibold mt-6">Add new exercises:</h2>
        <AddExerciseToClientForm clientId={clientId} date={date} />
      </div>
    </div>
  );
};

export default AddExerciseToClientPage;
