import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../entities/client/api';
import { useAddWorkout } from '../../entities/workouts/api';

const AddWorkoutPage: React.FC = () => {
  const navigate = useNavigate();
  const clientsQuery = useClients();
  const addWorkoutMutation = useAddWorkout();

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [completed, setCompleted] = useState<boolean>(false);

  const { data: clients, isLoading, isError, error } = clientsQuery;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId) return;

    await addWorkoutMutation.mutateAsync({
      clientId: selectedClientId,
      date,
      completed,
    });

    setSelectedClientId(null);
    setDate(new Date().toISOString().split('T')[0]);
    setCompleted(false);

    navigate(`/client/${selectedClientId}`);
  };

  if (isLoading) return <div>Ładowanie podopiecznych...</div>;
  if (isError) return <div className="text-red-500">Błąd: {(error as Error).message}</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dodaj nowy trening</h1>

      <h2 className="text-xl font-semibold mb-4">Podopieczni</h2>
      <ul className="flex flex-col gap-2 mb-6">
        {clients?.map((client) => (
          <li
            key={client.id}
            className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${
              selectedClientId === client.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => setSelectedClientId(client.id)}
          >
            {client.name}
          </li>
        ))}
      </ul>

      {selectedClientId && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">
            Dodawanie treningu dla {clients?.find((c) => c.id === selectedClientId)?.name}
          </h2>

          <label>
            Data treningu:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Oznacz jako ukończony
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedClientId(null)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Wybierz innego podopiecznego
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Dodaj trening
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddWorkoutPage;
