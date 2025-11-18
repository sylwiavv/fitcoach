import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../../shared/lib/supabase';
import type { WorkoutInput } from './types';

export const fetchWorkouts = async (clientId: number) => {
  const { data, error } = await supabase.from('Workouts').select('*').eq('client_id', clientId);

  if (error) throw new Error(error.message);
  return data;
};

export const useWorkouts = (clientId: number) => {
  return useQuery({
    queryKey: ['Workouts', clientId],
    queryFn: () => fetchWorkouts(clientId),
  });
};

export const useAddWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newWorkout: WorkoutInput) => {
      const { data, error } = await supabase
        .from('Workouts')
        .insert([
          {
            client_id: newWorkout.clientId,
            date: newWorkout.date,
            completed: newWorkout.completed ?? false,
          },
        ])
        .select();

      if (error) throw error;
      return data?.[0];
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['Workouts', variables.clientId],
      });
    },

    onError: (error) => {
      console.error('❌ Błąd przy dodawaniu treningu:', error);
    },
  });
};
