import { supabase } from '../../../shared/lib/supabase';

export const markExerciseCompleted = async ({
  exerciseId,
  completed,
}: {
  exerciseId: string;
  completed: boolean;
}) => {
  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .update({ completed })
    .eq('id', exerciseId)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
