import { supabase } from '../../../shared/lib/supabase';

export const fetchWorkout = async (clientId: string, date: string) => {
  const { data, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .single();

  if (error) throw new Error(error.message);
  return data;
};
