"use client";

import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/table";
import { InvoiceWithClient } from "@/types";
import { cn, formatMoney } from "@/lib/utils";
import { InvoiceActions } from "./invoice-actions";

export function InvoicesTable({
  invoices,
}: {
  invoices: InvoiceWithClient[];
}) {
  const router = useRouter();

  return (
    <ScrollArea>
      <DataTable
        data={invoices}
        caption={`A list of your ${invoices.length} invoices.`}
        onAddNew={() => router.push("/invoices/new")}
        columns={[
          {
            label: "Client",
            key: "client.name",
            render: (row) => row.client.name,
          },
          {
            label: "Email",
            key: "client.email",
            render: (row) => row.client.email ?? "",
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
            render: (row) => formatMoney(row.amount),
          },
          {
            label: "",
            key: "actions",
            className: "text-right",
            render: (row) => <InvoiceActions invoice={row} />,
          },
        ]}
      />
    </ScrollArea>
  );
}
