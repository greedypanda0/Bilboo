import { getClients } from "@/actions/clients";
import { getSession } from "@/actions/getSession";
import { getInvoices } from "@/actions/invoices";
import { getRevenue } from "@/actions/revenue";
import DataChart from "@/components/data-chart";
import { InvoicesTable } from "@/components/invoice/invoices-table";
import Main from "@/components/main";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getSession();
  if (!user) redirect("/auth/login");
  const clients = await getClients();
  const invoices = await getInvoices();
  const revenue = await getRevenue();

  const stats = [
    {
      label: "Customers",
      value: clients.length,
    },
    {
      label: "Cash Earned",
      value: formatMoney(
        Number(
          invoices
            .filter((c) => c.status === "PAID")
            .reduce((sum, invoice) => sum + invoice.amount, 0)
            .toFixed(2)
        )
      ),
    },
    {
      label: "Cash Pending",
      value: formatMoney(
        Number(
          invoices
            .filter((c) => c.status === "UNPAID")
            .reduce((sum, invoice) => sum + invoice.amount, 0)
            .toFixed(2)
        )
      ),
    },
    {
      label: "Invoices",
      value: invoices.length,
    },
    {
      label: "Invoice Paid",
      value: invoices.filter((i) => i.status === "PAID").length,
    },
    {
      label: "Invoice Pending",
      value: invoices.filter((i) => i.status === "UNPAID").length,
    },
  ];

  const chartData = revenue.map((entry) => ({
    year: `${entry.month}/${entry.year}`,
    value: entry.total,
  }));

  return (
    <Main>
      <div className="grid gap-4 grid-cols-3 my-4">
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
      <div className="bg-card my-4 rounded-xl p-6">
        <InvoicesTable invoices={invoices.slice(0, 5)} />
      </div>
      <div className="bg-card my-4 rounded-xl p-6">
        <DataChart data={chartData} />
      </div>
    </Main>
  );
}
