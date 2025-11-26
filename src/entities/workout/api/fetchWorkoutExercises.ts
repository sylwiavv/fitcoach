import { supabase } from '../../../shared/lib/supabase';
import type { ClientWorkoutExercise } from '../model/types';
import { getOrCreateWorkout } from './getOrCreateWorkout';

export const fetchWorkoutExercises = async (
  clientId: string,
  date: string,
): Promise<ClientWorkoutExercise[]> => {
  const workout = await getOrCreateWorkout(clientId, date);

  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .select(
      `
      id,
      client_workout_id,
      exercise_id,
      sets,
      reps,
      load,
      completed,
      notes,
      exercise:exercise_id (
        id,
        name,
        image_url,
        notes
      )
    `,
    )
    .eq('client_workout_id', workout.id);

  if (error) throw new Error(error.message);

  return (data || []).map((item) => ({
    ...item,
    exercise: Array.isArray(item.exercise) ? item.exercise[0] : item.exercise,
  })) as ClientWorkoutExercise[];
};
