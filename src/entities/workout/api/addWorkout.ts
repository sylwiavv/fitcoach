import { supabase } from '../../../shared/lib/supabase';
import type { AddWorkoutPayload } from '../model/types';

export const addWorkout = async ({ clientId, date, exercises }: AddWorkoutPayload) => {
  const { data: workout, error: fetchErr } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (fetchErr) throw new Error(fetchErr.message);

  const workoutId = workout
    ? workout.id
    : (
        await supabase
          .from('ClientWorkouts')
          .insert({ client_id: clientId, date })
          .select('*')
          .single()
      ).data.id;

  const { error: insertError } = await supabase.from('ClientWorkoutExercises').insert(
    exercises.map((ex) => ({
      client_workout_id: workoutId,
      exercise_id: ex.exerciseId,
      sets: ex.sets,
      reps: ex.reps,
      load: ex.load,
      completed: false,
    })),
  );

  if (insertError) throw new Error(insertError.message);

  return true;
};
