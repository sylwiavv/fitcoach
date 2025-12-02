import React from 'react';

import AddExerciseForm from '../../components/AddExerciseForm';
import { BackButton } from '../../shared/ui';

const AddExercisePage: React.FC = () => {
  return (
    <>
      <BackButton />
      <h2 className="text-2xl font-bold mb-4 text-upper">Add Exercise</h2>
      <AddExerciseForm />
    </>
  );
};

export default AddExercisePage;
