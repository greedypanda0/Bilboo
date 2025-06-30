"use client";
import Main from "@/components/main";
import useInvoices from "@/hooks/useInvoices";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { InvoiceActions } from "@/components/invoiceActions";
import { DataTable } from "@/components/table";

export default function Invoices() {
  const { invoices, refetch } = useInvoices();
  const router = useRouter();

  return (
    <Main>
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
            {
              label: "",
              key: "actions",
              className: "text-right",
              render: (row) => (
                <InvoiceActions invoice={row} refetch={refetch} />
              ),
            },
          ]}
        />
      </ScrollArea>
    </Main>
  );
}
