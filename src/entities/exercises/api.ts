import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../../shared/lib/supabase';
import type { Exercise } from './types';

export type NewExercise = {
  name: string;
  notes?: string | null;
  image_url?: string | null;
};

export const addExercise = async (exercise: NewExercise) => {
  const { data, error } = await supabase.from('Exercises').insert([exercise]).select().single();
  if (error) throw new Error(error.message);
  return data;
};

export const useAddExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Exercises'],
      });
    },
  });
};

export const getOrCreateWorkout = async (clientId: string, date: string) => {
  const { data: workout, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (workout) return workout;
};

export const fetchWorkoutExercises = async (clientId: string, date: string) => {
  const workout = await getOrCreateWorkout(clientId, date);

  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .select(
      `
      id,
      sets,
      reps,
      load,
      completed,
      notes,
      exercise:exercise_id (*)
    `,
    )
    .eq('client_workout_id', workout.id);

  if (error) throw new Error(error.message);
  return data || [];
};

export const useWorkoutExercises = (clientId: string, date: string) => {
  return useQuery({
    queryKey: ['workout-exercises', clientId, date],
    queryFn: () => fetchWorkoutExercises(clientId, date),
  });
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  const { data, error } = await supabase.from('Exercises').select('*');
  if (error) throw new Error(error.message);
  return data || [];
};

export const useExercises = () => {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });
};
