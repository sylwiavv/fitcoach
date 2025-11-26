import { supabase } from '../../../shared/lib/supabase';

export const fetchWorkoutsByClient = async (clientId: string) => {
  const { data, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId);

  if (error) throw new Error(error.message);
  return data ?? [];
};
