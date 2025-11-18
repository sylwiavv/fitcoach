import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../shared/lib/supabase';
import type { TrainingPlan } from './types';

export const fetchTrainingPlan = async (
  clientId: string,
  date: string,
): Promise<TrainingPlan[]> => {
  const { data, error } = await supabase
    .from('training_plans')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date);

  if (error) throw error;
  return data;
};

export const useTrainingPlan = (clientId: string, date: string) => {
  return useQuery(['trainingPlan', clientId, date], () => fetchTrainingPlan(clientId, date), {
    staleTime: 5 * 60 * 1000,
  });
};
