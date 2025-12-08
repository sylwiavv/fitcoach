export type AddExerciseToClientFormProps = {
  clientId: string;
  date: string;
};

export interface AddExerciseToClientFormValues {
  exerciseId: string;
  sets: number;
  reps: number;
  load: number;
  notes: string;
}

export const defaultValues: AddExerciseToClientFormValues = {
  exerciseId: '',
  sets: 1,
  reps: 1,
  load: 0,
  notes: '',
};
