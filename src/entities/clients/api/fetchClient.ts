import { supabase } from '../../../shared/lib/supabase';
import type { Client } from '../../client/types';

export const fetchClient = async (id: string): Promise<Client> => {
  const { data, error } = await supabase.from('Clients').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);
  return data;
};
