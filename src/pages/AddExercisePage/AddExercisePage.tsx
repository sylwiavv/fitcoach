import React from 'react';

import AddExerciseForm from '../../components/AddExerciseForm';
import { BackButton } from '../../shared/ui';

const AddExercisePage: React.FC = () => {
  return (
    <>
      <BackButton />
      <>
        <h1 className="text-2xl font-bold mb-4">Add Exercise</h1>
        <AddExerciseForm />
      </>
    </>
  );
};

export default AddExercisePage;
