"use client";

import { CardWrapper } from "@/components/ui/card-wrapper";
import { useState } from "react";
import { FormWrapper } from "@/components/form/form-wrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { clientSchema, ClientSchemaType } from "@/schemas";
import { createClient } from "@/actions/clients";
import Main from "@/components/main";

export default function New() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: ClientSchemaType) => {
    setLoading(true);
    const { success, error } = await createClient(values);
    setLoading(false);

    if (error) {
      toast.error("Login failed", {
        description: error,
      });
    }

    if (success) {
      toast.success("client created");
    }
    router.push("/clients");
  };

  return (
    <Main className="max-w-xl">
      <CardWrapper
        headerTitle="Create new client"
        headerLabel="Enter client details"
      >
        <FormWrapper
          schema={clientSchema}
          fields={[
            {
              name: "name",
              label: "Name",
              placeholder: "john",
              type: "text",
            },
            {
              name: "email",
              label: "Email",
              placeholder: "email@example.com",
              type: "email",
            },
          ]}
          action={onSubmit}
          loading={loading}
          submitText="Create"
          defaultValues={{
            email: "",
            name: "",
          }}
        />
      </CardWrapper>
    </Main>
  );
}
