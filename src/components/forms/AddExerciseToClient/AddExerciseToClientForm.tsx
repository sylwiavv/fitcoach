import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useExercises } from '../../../entities/exercises/model/queries';
import { useAssignExerciseToClient } from '../../../entities/workout';
import FormProvider from '../../hook-form';
import { RHFInputField } from '../../hook-form/RHFInputField';
import PrimaryButton from '../../PrimaryButton';
import { useSnackbar } from '../../snackbbar/SnackBarProvider';
import { AddExerciseToClientSchema } from './AddExerciseToClientSchema';
import {
  type AddExerciseToClientFormProps,
  type AddExerciseToClientFormValues,
  defaultValues,
} from './types';

const AddExerciseToClient: React.FC<AddExerciseToClientFormProps> = ({ clientId, date }) => {
  const { data: exercisesData, isLoading, isError, error } = useExercises();
  const mutation = useAssignExerciseToClient();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<AddExerciseToClientFormValues>({
    resolver: yupResolver(AddExerciseToClientSchema),
    defaultValues,
  });

  const { watch, reset, handleSubmit } = methods;
  const selectedExerciseId = watch('exerciseId');

  const onSubmit = (data: AddExerciseToClientFormValues) => {
    enqueueSnackbar('Adding exercise...', { variant: 'info' });

    mutation.mutate(
      { clientId, date, ...data },
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

  if (isLoading) {
    return <div className="flex flex-col gap-4">Loading exercises...</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4">
        <FormProvider methods={methods} onSubmit={() => {}}>
          <div className="text-red">Error fetching exercises: {(error as Error).message}</div>
        </FormProvider>
      </div>
    );
  }

  const handleClick = () => {
    enqueueSnackbar('Exercise added successfully!', { variant: 'success' });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <button onClick={handleClick}>Show Snackbar</button>
        <RHFInputField
          name="exerciseId"
          label="Exercise"
          type="select"
          placeholder="Select exercise..."
          options={exercisesData?.map((ex) => ({ value: ex.id, label: ex.name })) || []}
          required
        />
        {selectedExerciseId && (
          <div className="flex flex-col gap-4">
            <RHFInputField name="sets" label="Sets" type="number" min={1} />
            <RHFInputField name="reps" label="Reps" type="number" min={1} />
            <RHFInputField name="load" label="Load (kg)" type="number" min={0} />
            <RHFInputField
              name="notes"
              label="Notes"
              type="textarea"
              placeholder="Optional notes..."
            />
          </div>
        )}
        <PrimaryButton type="submit">
          <b>+</b> Add Exercise to Workout
        </PrimaryButton>
      </div>
    </FormProvider>
  );
};

export default AddExerciseToClient;
