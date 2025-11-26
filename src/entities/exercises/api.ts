import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../../shared/lib/supabase';
import type { ClientWorkoutExercise, NewExercise } from '../workouts/types';
import type { Exercise } from './types';

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

  const { data: newWorkout, error: insertErr } = await supabase
    .from('ClientWorkouts')
    .insert({ client_id: clientId, date })
    .select()
    .single();

  if (insertErr) throw new Error(insertErr.message);

  return newWorkout;
};

export const fetchWorkoutExercises = async (
  clientId: string,
  date: string,
): Promise<ClientWorkoutExercise[]> => {
  const workout = await getOrCreateWorkout(clientId, date);

  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .select(
      `
      id,
      client_workout_id,
      exercise_id,
      sets,
      reps,
      load,
      completed,
      notes,
      exercise:exercise_id (
        id,
        name,
        image_url,
        notes
      )
    `,
    )
    .eq('client_workout_id', workout.id);

  if (error) throw new Error(error.message);
  return data ?? [];
};

export const useWorkoutExercises = (clientId: string, date: string) =>
  useQuery<ClientWorkoutExercise[]>({
    queryKey: ['workout-exercises', clientId, date],
    queryFn: () => fetchWorkoutExercises(clientId, date),
  });

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

export const addExerciseToWorkout = async ({
  clientId,
  date,
  exerciseId,
}: {
  clientId: string;
  date: string;
  exerciseId: string;
}) => {
  const workout = await getOrCreateWorkout(clientId, date);

  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .insert({
      client_workout_id: workout.id,
      exercise_id: exerciseId,
      sets: 0,
      reps: 0,
      load: 0,
      completed: false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useAddExerciseToWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExerciseToWorkout,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workout-exercises', variables.clientId, variables.date],
      });
    },
  });
};
