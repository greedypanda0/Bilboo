"use client";

import Main from "@/components/main";
import useClients from "@/hooks/useClients";
import useInvoices from "@/hooks/useInvoices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useRevenue from "@/hooks/useRevenue";
import { RevenueChart } from "@/components/revenueChart";
import { DataTable } from "@/components/table";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { clients } = useClients();
  const { invoices } = useInvoices();
  const { revenue } = useRevenue();

  const stats = [
    {
      label: "Customers",
      value: clients.length,
    },
    {
      label: "Invoices",
      value: invoices.length,
    },
    {
      label: "Paid",
      value: invoices.filter((i) => i.status === "PAID").length,
    },
    {
      label: "Pending",
      value: invoices.filter((i) => i.status === "UNPAID").length,
    },
  ];

  const chartData = revenue.map((entry) => ({
    name: `${entry.month}/${entry.year}`,
    total: entry.total,
  }));

  return (
    <Main>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {stat.value}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 grid-cols-1 bg-card h-65 my-6 rounded-xl">
        <DataTable
          data={invoices.slice(0, 5)}
          caption={`A list of your top 5 invoices.`}
          columns={[
            {
              label: "Client",
              key: "client.name",
              render: (row) => row.client.name,
            },
            {
              label: "Email",
              key: "client.email",
              render: (row) => row.client.email,
            },
            {
              label: "Status",
              key: "status",
              render: (row) => (
                <span
                  className={cn(
                    "font-medium",
                    row.status === "PAID" ? "text-green-500" : "text-rose-500"
                  )}
                >
                  {row.status}
                </span>
              ),
            },
            {
              label: "Amount",
              key: "amount",
              className: "text-center",
              render: (row) =>
                new Intl.NumberFormat(navigator.language, {
                  style: "currency",
                  currency: "USD",
                }).format(row.amount),
            },
          ]}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 h-auto my-6">
        <RevenueChart data={chartData} />
      </div>
    </Main>
  );
}
