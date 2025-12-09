import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AddClientButton from '../../components/AddClientButton';
import type { Client } from '../../entities/client/types';
import { useClients } from '../../entities/clients/model/queries';
import SectionHeader from '../../shared/ui/SectionHeader';

const ClientsPage: React.FC = () => {
  const { data: clients, isLoading, isError, error } = useClients();
  const navigate = useNavigate();

  const data = useMemo<Client[]>(() => clients || [], [clients]);

  const columns = useMemo<ColumnDef<Client>[]>(
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
        header: 'Name',
      },
      {
        accessorKey: 'created_at',
        header: 'Registered',
        cell: ({ getValue }) => {
          const dateStr = getValue() as string;
          if (!dateStr) return '-';
          const date = new Date(dateStr);
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

  if (isLoading) return <div className="p-6">Loading clients...</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Active Clients" description="See how many active clients you have." />

      <div className="flex gap-2 items-center justify-end">
        <AddClientButton />
      </div>

      <div className="overflow-x-auto bg-ghost-grey rounded-xl p-4 ">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left border-b border-dark-violet">
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
                className="cursor-pointer hover:bg-light-violet transition-colors  last:border-yellow-200"
                onClick={() => navigate(`/client/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border-b border-dark-violet  ">
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
