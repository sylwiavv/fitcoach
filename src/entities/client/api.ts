import { supabase } from '../../shared/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Clients } from '../clients/types';
import type { Client } from './types';

export const fetchClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase.from('Clients').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    staleTime: 5 * 60 * 1000,
  });
};

export const addClient = async (client: Omit<Clients, 'id'>) => {
  const { data, error } = await supabase.from('Clients').insert([client]).select();
  if (error) throw new Error(error.message);
  return data;
};

export const useAddClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

export const fetchClient = async (id: number): Promise<Client> => {
  const { data, error } = await supabase.from('Clients').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
};

export const useClient = (id: number) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => fetchClient(id),
    staleTime: 5 * 60 * 1000,
  });
};
