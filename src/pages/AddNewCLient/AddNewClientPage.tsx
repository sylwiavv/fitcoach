import React, { useState } from "react";
import { useAddClient } from "../../entities/client/api";

const AddClientPage: React.FC = () => {
  const addClientMutation = useAddClient();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [progress, setProgress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !progress) {
      alert("Podaj imię i postęp klienta!");
      return;
    }

    addClientMutation.mutate({
      name,
      avatar,
      progress,
    });

    setName("");
    setAvatar("");
    setProgress("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Dodaj nowego klienta</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Imię klienta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="URL avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Postęp (np. 50%)"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={addClientMutation.isLoading}
        >
          {addClientMutation.isLoading ? "Dodawanie..." : "Dodaj klienta"}
        </button>

        {addClientMutation.isError && (
          <p className="text-red-500 mt-2">
            Błąd: {(addClientMutation.error as Error).message}
          </p>
        )}

        {addClientMutation.isSuccess && (
          <p className="text-green-500 mt-2">Klient został dodany!</p>
        )}
      </form>
    </div>
  );
};

export default AddClientPage;
