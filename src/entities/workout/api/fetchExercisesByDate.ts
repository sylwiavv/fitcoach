import { supabase } from '../../../shared/lib/supabase';

export const fetchExercisesByDate = async (clientId: string, date: string) => {
  const { data: workout, error: workoutError } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (workoutError) throw new Error(workoutError.message);
  if (!workout) return [];

  const { data: exercises, error: exError } = await supabase
    .from('ClientWorkoutExercises')
    .select(
      `
        id,
        sets,
        reps,
        load,
        completed,
        notes,
        exercise:exercise_id (*)
      `,
    )
    .eq('client_workout_id', workout.id);

  if (exError) throw new Error(exError.message);
  return exercises ?? [];
};
