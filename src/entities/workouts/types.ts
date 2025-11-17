export interface Workouts {
  id: string;
  client_id: number;
  date: Date;
  completed: boolean;
}
export interface WorkoutInput {
  clientId: number;
  date: string;
  completed?: boolean;
}
