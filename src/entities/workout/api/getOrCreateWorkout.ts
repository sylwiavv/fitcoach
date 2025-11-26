import { supabase } from '../../../shared/lib/supabase';

export const getOrCreateWorkout = async (clientId: string, date: string) => {
  const { data: workout, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (workout) return workout;

  const { data: newWorkout, error: insertErr } = await supabase
    .from('ClientWorkouts')
    .insert({ client_id: clientId, date })
    .select()
    .single();

  if (insertErr) throw new Error(insertErr.message);

  return newWorkout;
};
