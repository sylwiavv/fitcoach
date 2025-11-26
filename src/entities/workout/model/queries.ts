import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addExerciseToClientWorkout } from '../api/addExerciseToClientWorkout';
import { addExerciseToWorkout } from '../api/addExerciseToWorkout';
import { addWorkout } from '../api/addWorkout';
import { createWorkoutForDay } from '../api/createWorkoutForDay';
import { fetchExercisesByDate } from '../api/fetchExercisesByDate';
import { fetchWorkout } from '../api/fetchWorkout';
import { fetchWorkoutExercises } from '../api/fetchWorkoutExercises';
import { fetchWorkoutsByClient } from '../api/fetchWorkoutsByClient';
import { markExerciseCompleted } from '../api/markExerciseCompleted';
import { markWorkoutCompleted } from '../api/markWorkoutCompleted';

export const useWorkoutExercises = (clientId: string, date: string) =>
  useQuery({
    queryKey: ['workout-exercises', clientId, date],
    queryFn: () => fetchWorkoutExercises(clientId, date),
  });

export const useWorkoutsByClient = (clientId: string) =>
  useQuery({
    queryKey: ['workouts', clientId],
    queryFn: () => fetchWorkoutsByClient(clientId),
  });

export const useExercisesByDate = (clientId: string, date: string) =>
  useQuery({
    queryKey: ['workout-exercises', clientId, date],
    queryFn: () => fetchExercisesByDate(clientId, date),
  });

export const useWorkout = (clientId: string, date: string) =>
  useQuery({
    queryKey: ['workout', clientId, date],
    queryFn: () => fetchWorkout(clientId, date),
  });

// -------------------------------------------------------

export const useAddExerciseToWorkout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addExerciseToWorkout,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ['workout-exercises', vars.clientId, vars.date],
      });
    },
  });
};

export const useAssignExerciseToClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addExerciseToClientWorkout,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ['workout-exercises', vars.clientId, vars.date],
      });
    },
  });
};

export const useMarkExerciseCompleted = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markExerciseCompleted,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['workout-exercises'],
      });
    },
  });
};

export const useCreateWorkoutForDay = (options?: { onSuccess?: () => void }) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createWorkoutForDay,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ['workouts', vars.clientId],
      });
      options?.onSuccess?.();
    },
  });
};

export const useAddWorkout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addWorkout,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workouts'] });
      qc.invalidateQueries({ queryKey: ['workout-exercises'] });
    },
  });
};

export const useMarkWorkoutCompleted = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markWorkoutCompleted,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['workouts'],
      });
    },
  });
};
