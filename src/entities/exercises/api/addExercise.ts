import { supabase } from '../../../shared/lib/supabase';
import type { NewExercise } from '../../workout/model/types';

export const addExercise = async (exercise: NewExercise) => {
  const { data, error } = await supabase.from('Exercises').insert([exercise]).select().single();

  if (error) throw new Error(error.message);
  return data;
};
