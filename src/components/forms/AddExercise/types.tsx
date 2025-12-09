export interface AddExerciseValues {
  name: string;
  notes: string | '';
  image: string | '';
}

export const defaultValues: AddExerciseValues = {
  name: '',
  notes: '',
  image: '',
};
