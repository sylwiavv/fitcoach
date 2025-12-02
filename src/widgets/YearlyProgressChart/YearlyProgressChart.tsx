import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { useClients } from '../../entities/clients/model/queries';
import SectionHeader from '../../shared/ui/SectionHeader';

export const YearlyClientsChart: React.FC = () => {
  const { data: clients, isLoading, isError, error } = useClients();

  if (isLoading) return <div>Loading clients...</div>;
  if (isError) return <div className="text-red">Error: {(error as Error).message}</div>;
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
    <>
      <SectionHeader
        title="Yearly Active Clients"
        description="See how the number of active clients grew throughout the year."
      />

      <div className="h-64 shadow mt-6 bg-ghost-grey p-6 rounded-main">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Area type="monotone" dataKey="count" stroke="#aa92f6" fill="#aa92f6" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
