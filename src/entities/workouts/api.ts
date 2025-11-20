import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../../shared/lib/supabase';
import type { Exercise } from '../exercises/types';

export const ensureClientWorkoutExists = async (clientId: string, date: string) => {
  const { data, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (data) return data.id;

  const { data: newWorkout, error: insertErr } = await supabase
    .from('ClientWorkouts')
    .insert([{ client_id: clientId, date }])
    .select()
    .single();

  if (insertErr) throw new Error(insertErr.message);

  return newWorkout.id;
};

export type AssignExercisePayload = {
  clientId: string;
  date: string;
  exerciseId: string;
  sets: number;
  reps: number;
  load: number;
  notes?: string | null;
};

export const addExerciseToClientWorkout = async (payload: AssignExercisePayload) => {
  const { clientId, date, exerciseId, sets, reps, load, notes } = payload;

  const clientWorkoutId = await ensureClientWorkoutExists(clientId, date);

  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .insert([
      {
        client_workout_id: clientWorkoutId,
        exercise_id: exerciseId,
        sets,
        reps,
        load,
        notes: notes || null,
        completed: false,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useAssignExerciseToClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExerciseToClientWorkout,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['workout-exercises', vars.clientId, vars.date],
      });
    },
  });
};

export const fetchWorkoutsByClient = async (clientId: string) => {
  const { data, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId);

  if (error) throw new Error(error.message);
  return data;
};

export const useWorkoutsByClient = (clientId: string) =>
  useQuery({
    queryKey: ['workouts', clientId],
    queryFn: () => fetchWorkoutsByClient(clientId),
  });

export const fetchExercisesByDate = async (clientId: string, date: string) => {
  const { data: workout, error: workoutError } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (workoutError) throw new Error(workoutError.message);
  if (!workout) return [];

  const { data: exercises, error: exError } = await supabase
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

  if (exError) throw new Error(exError.message);
  return exercises ?? [];
};

export const useExercisesByDate = (clientId: string, date: string) =>
  useQuery({
    queryKey: ['workout-exercises', clientId, date],
    queryFn: () => fetchExercisesByDate(clientId, date),
  });

export const markExerciseCompleted = async ({
  exerciseId,
  completed,
}: {
  exerciseId: string;
  completed: boolean;
}) => {
  const { data, error } = await supabase
    .from('ClientWorkoutExercises')
    .update({ completed })
    .eq('id', exerciseId)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const useMarkExerciseCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markExerciseCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workout-exercises'],
      });
    },
  });
};

export type CreateWorkoutPayload = {
  clientId: string;
  date: string;
};

export const createWorkoutForDay = async ({ clientId, date }: CreateWorkoutPayload) => {
  const { data: existingWorkout, error } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (existingWorkout) return existingWorkout;

  const { data: newWorkout, error: insertError } = await supabase
    .from('ClientWorkouts')
    .insert({ client_id: clientId, date })
    .select('*')
    .single();

  if (insertError) throw new Error(insertError.message);
  return newWorkout;
};

export const useCreateWorkoutForDay = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkoutForDay,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workouts', variables.clientId],
      });
      options?.onSuccess?.();
    },
  });
};

export const addWorkout = async ({ clientId, date, exercises }: AddWorkoutPayload) => {
  const { data: workout, error: fetchWorkout } = await supabase
    .from('ClientWorkouts')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle();

  if (fetchWorkout) throw new Error(fetchWorkout.message);

  let workoutId: string;
  if (workout) {
    workoutId = workout.id;
  } else {
    const { data: newWorkout, error: createWorkout } = await supabase
      .from('ClientWorkouts')
      .insert({ client_id: clientId, date })
      .select('*')
      .single();

    if (createWorkout) throw new Error(createWorkout.message);
    workoutId = newWorkout.id;
  }

  const { error: insertError } = await supabase.from('ClientWorkoutExercises').insert(
    exercises.map((ex: Exercise) => ({
      client_workout_id: workoutId,
      exercise_id: ex.exercise_id,
      sets: ex.sets,
      reps: ex.reps,
      load: ex.load,
      completed: false,
    })),
  );

  if (insertError) throw new Error(insertError.message);

  return true;
};

export const useAddWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      queryClient.invalidateQueries({ queryKey: ['workout-exercises'] });
    },
  });
};
