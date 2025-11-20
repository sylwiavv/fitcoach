import React, { useState } from 'react';

import { useAddClient } from '../../entities/client/api';

const AddClientPage: React.FC = () => {
  const addClientMutation = useAddClient();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert('Enter a name');
      return;
    }

    addClientMutation.mutate({ name, avatar });

    setName('');
    setAvatar('');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Client</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={addClientMutation.isPending}
        >
          {addClientMutation.isPending ? 'Adding...' : 'Add Client'}
        </button>

        {addClientMutation.isError && (
          <p className="text-red-500 mt-2">Error: {(addClientMutation.error as Error).message}</p>
        )}

        {addClientMutation.isSuccess && (
          <p className="text-green-500 mt-2">Client added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddClientPage;
