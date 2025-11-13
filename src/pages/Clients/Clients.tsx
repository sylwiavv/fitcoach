import React from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "../../entities/clients/api";

const ClientsPage: React.FC = () => {
  // const clients = [
  //   {
  //     name: "Test",
  //     avatar:
  //       "https://thumbs.dreamstime.com/b/funny-horse-wild-eyes-eyed-closeup-looking-camera-87714945.jpg",
  //     progress: "5%",
  //     id: 2,
  //   },
  //   {
  //     name: "Test 4",
  //     avatar:
  //       "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBob3JzZXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
  //     progress: "50%",
  //     id: 9,
  //   },
  // ];
  const { data: clients, isLoading, isError, error } = useClients();
  const navigate = useNavigate();

  if (isLoading) return <div className="p-6">Ładowanie podopiecznych...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-500">Błąd: {(error as Error).message}</div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Podopieczni</h1>
      <table className="min-w-full bg-alice-blue p-4 rounded-2xl">
        <thead className="text-left font-bold">
          <tr>
            <th className="px-4 py-2 border-b border-ghost-white">Avatar</th>
            <th className="px-4 py-2 border-b border-ghost-white">Imię</th>
            <th className="px-4 py-2 border-b border-ghost-white">
              Postęp (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client, index) => {
            const isLast = index === clients.length - 1;
            return (
              <tr
                key={client.id}
                className="cursor-pointer hover:bg-vanilla"
                onClick={() => navigate(`/client/${client.id}`)}
              >
                <td
                  className={`px-4 py-2 ${!isLast ? "border-b border-ghost-white" : ""}`}
                >
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td
                  className={`px-4 py-2 ${!isLast ? "border-b border-ghost-white" : ""}`}
                >
                  {client.name}
                </td>
                <td
                  className={`px-4 ${!isLast ? "border-b border-ghost-white" : ""}`}
                >
                  {client.progress}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsPage;
