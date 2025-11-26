import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addClient } from '../api/addClient';
import { fetchClient } from '../api/fetchClient';
import { fetchClients } from '../api/fetchClients';

export const useClients = () =>
  useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    staleTime: 5 * 60 * 1000,
  });

export const useClient = (id: string) =>
  useQuery({
    queryKey: ['client', id],
    queryFn: () => fetchClient(id),
    staleTime: 5 * 60 * 1000,
  });

export const useAddClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
