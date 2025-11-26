import { supabase } from '../../../shared/lib/supabase';

export const createWorkoutForDay = async ({ clientId, date }: { clientId: string; date: Date }) => {
  const { data: existingWorkout, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (existingWorkout) return existingWorkout;

  const { data: newWorkout, error: insertError } = await supabase
    .from('ClientWorkouts')
    .insert({ client_id: clientId, date })
    .select('*')
    .single();

  if (insertError) throw new Error(insertError.message);
  return newWorkout;
};
