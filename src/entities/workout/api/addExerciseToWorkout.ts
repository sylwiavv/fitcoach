import { supabase } from '../../../shared/lib/supabase';
import { getOrCreateWorkout } from './getOrCreateWorkout';

export const addExerciseToWorkout = async ({
  clientId,
  date,
  exerciseId,
}: {
  clientId: string;
  date: string;
  exerciseId: string;
}) => {
  const workout = await getOrCreateWorkout(clientId, date);

  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .insert({
      client_workout_id: workout.id,
      exercise_id: exerciseId,
      sets: 0,
      reps: 0,
      load: 0,
      completed: false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
