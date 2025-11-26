import { supabase } from '../../../shared/lib/supabase';

export const ensureClientWorkoutExists = async (clientId: string, date: string) => {
  const { data, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (data) return data.id;

  const { data: newWorkout, error: insertErr } = await supabase
    .from('ClientWorkouts')
    .insert([{ client_id: clientId, date }])
    .select()
    .single();

  if (insertErr) throw new Error(insertErr.message);
  return newWorkout.id;
};
