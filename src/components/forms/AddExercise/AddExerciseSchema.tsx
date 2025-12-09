import * as yup from 'yup';

export const AddExerciseSchema = yup.object().shape({
  name: yup.string().required('Exercise name is required'),
  notes: yup.string().default(''),
  image: yup.string().url('Must be a valid URL').default(''),
});
