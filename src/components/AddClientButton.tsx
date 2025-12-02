import React from 'react';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from './PrimaryButton';

const AddClientButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/clients/add');
  };

  return (
    <>
      <PrimaryButton onClick={handleClick}>
        <b>+</b> Add new Client
      </PrimaryButton>
    </>
  );
};

export default AddClientButton;
