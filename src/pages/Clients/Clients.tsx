import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AddClientButton from '../../components/AddClientButton';
import { useClients } from '../../entities/client/api';
import { YearlyProgressChart } from '../../widgets/YearlyProgressChart/YearlyProgressChart';

type ClientRow = {
  id: number;
  name: string;
  avatar: string;
  progress: string;
};

const ClientsPage: React.FC = () => {
  const { data: clients, isLoading, isError, error } = useClients();
  const navigate = useNavigate();

  const data = useMemo<ClientRow[]>(() => clients || [], [clients]);

  const columns = useMemo<ColumnDef<ClientRow>[]>(
    () => [
      {
        accessorKey: 'avatar',
        header: 'Avatar',
        cell: ({ row }) => (
          <img
            src={row.original.avatar}
            alt={row.original.name}
            className="w-12 h-12 rounded-full"
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Imię',
      },
      {
        accessorKey: 'created_at',
        header: 'Registered',
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return date.toISOString().split('T')[0];
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-6">Ładowanie podopiecznych...</div>;
  if (isError) return <div className="p-6 text-red-500">Błąd: {(error as Error).message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <AddClientButton />
      <YearlyProgressChart workouts={[]} />

      <h1 className="text-2xl font-bold mb-4">Podopieczni</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-alice-blue p-4 rounded-2xl">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left border-b border-ghost-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-vanilla"
                onClick={() => navigate(`/client/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border-b border-ghost-white">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsPage;
