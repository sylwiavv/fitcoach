import * as Yup from 'yup';

export const AddExerciseToClientSchema = Yup.object().shape({
  exerciseId: Yup.string().required('Exercise is required'),
  sets: Yup.number().min(1, 'Min 1 set').required('Sets is required'),
  reps: Yup.number().min(1, 'Min 1 rep').required('Reps required'),
  load: Yup.number().min(0).default(0),
  notes: Yup.string().default(''),
});
