import { supabase } from '../../../shared/lib/supabase';
import type { Exercise } from '../types';

export const fetchExercises = async (): Promise<Exercise[]> => {
  const { data, error } = await supabase.from('Exercises').select('*');
  if (error) throw new Error(error.message);
  return data ?? [];
};
