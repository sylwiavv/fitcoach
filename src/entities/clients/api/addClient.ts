import { supabase } from '../../../shared/lib/supabase';
import type { Clients } from '../model/types';

export const addClient = async (client: Omit<Clients, 'id'>) => {
  const { data, error } = await supabase.from('Clients').insert([client]).select();

  if (error) throw new Error(error.message);
  return data;
};
