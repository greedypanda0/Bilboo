"use client";
import Main from "@/components/main";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { invoiceSchema } from "@/lib/types";
import BaseForm from "@/components/form/Base";
import useClients from "@/hooks/useClients";
import useFormSubmit from "@/hooks/useFormSubmit";

export default function New() {
  const router = useRouter();
  const { clients } = useClients();
  const { submit, loading } = useFormSubmit({
    path: "/api/invoices",
    successMessage: "Invoice created!",
    errorMessage: "Failed to create invoice.",
  });

  const onSubmit = async (values: z.infer<typeof invoiceSchema>) => {
    const res = await submit(values);
    if (res) router.push("/invoices");
  };

  return (
    <Main>
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">New Invoice</h1>
            <p className="text-muted-foreground mt-2">
              Fill in invoice details to proceed.
            </p>
          </div>

          <BaseForm
            schema={invoiceSchema}
            fields={[
              {
                name: "client",
                label: "Client",
                type: "select",
                options: clients.map((e) => ({ label: e.name, value: e.name })),
              },
              {
                name: "amount",
                label: "Amount",
                type: "number",
                placeholder: "Enter amount",
              },
            ]}
            onSubmit={async (v) => {
              await onSubmit(v);
            }}
            loading={loading}
            submitText="Create Invoice"
            cancelText="Cancel"
            defaultValues={{
              client: "",
              amount: 0,
            }}
          />
        </div>
      </div>
    </Main>
  );
}
