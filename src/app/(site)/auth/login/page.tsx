"use client";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { loginSchema, LoginSchemaType } from "@/schemas";
import { login } from "@/actions/login";
import { useState } from "react";
import { FormWrapper } from "@/components/form/form-wrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: LoginSchemaType) => {
    setLoading(true);
    const { success, error } = await login(values);
    setLoading(false);

    if (error) {
      toast.error("Login failed", {
        description: error,
      });
    }

    if (success) {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  };

  return (
    <CardWrapper headerTitle="Log In" headerLabel="Enter your credentials">
      <FormWrapper
        schema={loginSchema}
        fields={[
          {
            name: "email",
            label: "Email",
            placeholder: "email@example.com",
            type: "email",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "••••••••",
            type: "password",
          },
        ]}
        action={onSubmit}
        loading={loading}
        submitText="Sign In"
        defaultValues={{
          email: "",
          password: "",
        }}
      />
    </CardWrapper>
  );
}
