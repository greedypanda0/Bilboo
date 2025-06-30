"use client";
import Main from "@/components/main";
import { useRouter } from "next/navigation";
import { z } from "zod";
import BaseForm from "@/components/form/Base";
import useFormSubmit from "@/hooks/useFormSubmit";
import { clientSchema } from "@/lib/types";

export default function NewClient() {
  const router = useRouter();

  const { submit, loading } = useFormSubmit({
    path: "/api/clients",
    successMessage: "Client added!",
    errorMessage: "Failed to add client.",
  });

  const onSubmit = async (values: z.infer<typeof clientSchema>) => {
    const res = await submit(values);
    if (res) router.push("/clients");
  };

  return (
    <Main>
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">New Client</h1>
            <p className="text-muted-foreground mt-2">Enter client details.</p>
          </div>

          <BaseForm
            schema={clientSchema}
            onSubmit={onSubmit}
            loading={loading}
            submitText="Create Client"
            cancelText="Cancel"
            defaultValues={{
              name: "",
              email: "",
            }}
            fields={[
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "john@example.com",
              },
            ]}
          />
        </div>
      </div>
    </Main>
  );
}
