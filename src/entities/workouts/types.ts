export interface Workout {
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

export type ClientWorkoutExercise = {
  id: string;
  client_workout_id: string;
  exercise_id: string;
  sets: number;
  reps: number;
  load: number;
  completed: boolean;
  notes?: string;

  exercise?: {
    id: string;
    name: string;
    image_url?: string;
    notes?: string;
  };
};

export type NewWorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  load: number;
};

export type AddWorkoutPayload = {
  clientId: string;
  date: string;
  exercises: NewWorkoutExercise[];
};
