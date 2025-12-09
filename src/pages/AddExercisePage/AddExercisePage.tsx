import React from 'react';

import AddExerciseForm from '../../components/forms/AddExercise/AddExerciseForm';
import { BackButton } from '../../shared/ui';
import SectionHeader from '../../shared/ui/SectionHeader';

const AddExercisePage: React.FC = () => {
  return (
    <div>
      <BackButton />

      <SectionHeader
        title="Add Exercise"
        description="Add a new exercise to your collection and use it across all workouts."
        className="mb-"
      />
      <AddExerciseForm />
    </div>
  );
};

export default AddExercisePage;
