import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addExercise } from '../api/addExercise';
import { fetchExercises } from '../api/fetchExercises';

export const useExercises = () =>
  useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });

export const useAddExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });
};
