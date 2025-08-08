// src/pages/panel/Panel.tsx
import { useAuthStore } from '@/stores';
import { useEffect, useState } from 'react';

type PanelData = {
  users: number;
  invoices: number;
  revenue: number;
};

export default function Panel() {
  const { user } = useAuthStore(); // assuming you have user info here
  const [data, setData] = useState<PanelData>({
    users: 0,
    invoices: 0,
    revenue: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData({
        users: 1245,
        invoices: 342,
        revenue: 58230,
      });
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">
        Welcome, {user?.username} 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-xl p-6 shadow bg-bg-primary text-text-primary">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{data.users}</p>
        </div>
        <div className="rounded-xl p-6 shadow bg-bg-primary text-text-primary">
          <h2 className="text-lg font-semibold">Invoices</h2>
          <p className="text-3xl font-bold mt-2">{data.invoices}</p>
        </div>
        <div className="rounded-xl p-6 shadow bg-bg-primary text-text-primary">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            ${data.revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
