import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useClients } from '../../entities/clients/model/queries';

export const YearlyClientsChart: React.FC = () => {
  const { data: clients, isLoading, isError, error } = useClients();

  if (isLoading) return <div>Loading clients...</div>;
  if (isError) return <div className="text-red-500">Error: {(error as Error).message}</div>;
  if (!clients) return null;

  const months = Array.from({ length: 12 }, (_, i) => i);
  let cumulativeCount = 0;

  const data = months.map((month) => {
    const monthClients = clients.filter(
      (c) => new Date(c.created_at).getMonth() === month && !c.archived,
    );
    cumulativeCount += monthClients.length;

    return {
      month: new Date(0, month).toLocaleString('en-US', { month: 'short' }),
      count: cumulativeCount,
    };
  });

  return (
    <div className="h-64 bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Yearly Active Clients</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#4ade80" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
