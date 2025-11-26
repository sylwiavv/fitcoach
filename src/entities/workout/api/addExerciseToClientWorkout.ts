import { supabase } from '../../../shared/lib/supabase';
import type { AssignExercisePayload } from '../model';
import { ensureClientWorkoutExists } from './ensureClientWorkoutExists';

export const addExerciseToClientWorkout = async (payload: AssignExercisePayload) => {
  const { clientId, date, exerciseId, sets, reps, load, notes } = payload;

  const clientWorkoutId = await ensureClientWorkoutExists(clientId, date);

  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .insert([
      {
        client_workout_id: clientWorkoutId,
        exercise_id: exerciseId,
        sets,
        reps,
        load,
        notes: notes || null,
        completed: false,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
