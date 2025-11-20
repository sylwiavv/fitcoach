export type Exercise = {
  id: string;
  client_id: string;
  exercise_id: string;
  name: string;
  load: number;
  reps: number;
  sets: number;
  completed: boolean;
  notes?: string;
  date: string;
  created_at: string;
};
