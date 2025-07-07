"use client";

import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/table";
import { ClientWithInvoiceIDs } from "@/types";

export default function ClientsTable({
  clients,
}: {
  clients: ClientWithInvoiceIDs[];
}) {
  const router = useRouter();

  return (
    <ScrollArea>
      <DataTable
        data={clients}
        caption={`A list of your ${clients.length} clients.`}
        onAddNew={() => router.push("/clients/new")}
        columns={[
          {
            label: "Name",
            key: "name",
            render: (row) => <span className="font-medium">{row.name}</span>,
            className: "w-[100px]",
          },
          {
            label: "Email",
            key: "email",
            render: (row) => row.email,
          },
          {
            label: "Invoices",
            key: "invoices",
            render: (row) => (
              <div className="text-center">{row.invoices?.length || 0}</div>
            ),
            className: "text-center",
          },
        ]}
      />
    </ScrollArea>
  );
}
