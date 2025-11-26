import { supabase } from '../../../shared/lib/supabase';

export const markWorkoutCompleted = async ({
  workoutId,
  completed,
}: {
  workoutId: string;
  completed: boolean;
}) => {
  const { data, error } = await supabase
    .from('ClientWorkouts')
    .update({ completed })
    .eq('id', workoutId)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
