import React from 'react';

import AddExerciseForm from '../../components/AddExerciseForm';

const AddExercisePage: React.FC = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Exercise</h1>
      <AddExerciseForm />
    </div>
  );
};

export default AddExercisePage;
