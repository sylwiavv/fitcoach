import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddClientButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/clients/add');
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center bg-eerie-black text-ghost-white rounded-full w-50 h-50"
    >
      <span className="text-xl font-bold">+</span>
    </button>
  );
};

export default AddClientButton;
