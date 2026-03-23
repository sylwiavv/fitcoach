'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import PrimaryButton from './PrimaryButton';

const AddClientButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/clients/add');
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
