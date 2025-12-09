import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAddExercise } from '../../../entities/exercises/model/queries';
import FormProvider from '../../hook-form';
import { RHFInputField } from '../../hook-form/RHFInputField';
import PrimaryButton from '../../PrimaryButton';
import { useSnackbar } from '../../snackbbar/SnackBarProvider';
import { AddExerciseSchema } from './AddExerciseSchema';
import { type AddExerciseValues, defaultValues } from './types';

const AddExerciseForm: React.FC = () => {
  const mutation = useAddExercise();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<AddExerciseValues>({
    resolver: yupResolver(AddExerciseSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: AddExerciseValues) => {
    enqueueSnackbar('Adding exercise...', { variant: 'info' });

    mutation.mutate(
      {
        name: data.name,
        notes: data.notes || '',
        image_url: data.image || '',
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Exercise added successfully!', { variant: 'success' });
          reset(defaultValues);
        },
        onError: (err: any) => {
          enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' });
        },
      },
    );
  };

  return (
    <div className="bg-ghost-grey rounded-main p-6 shadow">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <RHFInputField
            name="name"
            label="Exercise Name"
            type="text"
            placeholder="Exercise name"
            required
          />

          <RHFInputField
            name="notes"
            label="Notes"
            type="textarea"
            placeholder="Notes (optional)"
          />

          <RHFInputField
            name="image"
            label="Image URL"
            type="text"
            placeholder="Image URL (optional)"
          />

          <div>
            <PrimaryButton type="submit">
              <b>+</b> Add Exercise
            </PrimaryButton>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default AddExerciseForm;
