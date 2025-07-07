"use client"
import { invoiceSchema, InvoiceSchemaType } from "@/schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FormWrapper } from "./form/form-wrapper";
import { Client } from "@prisma/client";
import { createInvoice } from "@/actions/invoices";

export default function NewInvoiceForm({ clients }: { clients: Client[] }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: InvoiceSchemaType) => {
    setLoading(true);
    const { success, error } = await createInvoice(values);
    setLoading(false);

    if (error) {
      toast.error("invoice creation failed", {
        description: error,
      });
    }

    if (success) {
      toast.success("invoices created");
    }
    router.push("/invoices");
  };
  return (
    <FormWrapper
      schema={invoiceSchema}
      fields={[
        {
          name: "client",
          label: "Client",
          type: "select",
          options: clients.map((e) => ({ label: e.name, value: e.id })),
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          placeholder: "Enter amount",
        },
      ]}
      action={onSubmit}
      loading={loading}
      submitText="Create"
      defaultValues={{
        client: "",
        amount: 0,
      }}
    />
  );
}
