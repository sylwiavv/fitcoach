import { supabase } from '../../../shared/lib/supabase';
import type { Client } from '../../client/types';

export const fetchClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase.from('Clients').select('*').eq('archived', false);

  if (error) throw new Error(error.message);
  return data ?? [];
};
