"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import BaseForm from "@/components/form/Base";
import useFormSubmit from "@/hooks/useFormSubmit";
import { loginSchema } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const { submit, loading } = useFormSubmit({
    path: "/api/auth",
    successMessage: "Login successful",
    errorMessage: "Invalid credentials",
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res = await submit(values);
    if (res) router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">
            Enter your credentials to sign in
          </p>
        </div>

        <BaseForm
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
          onSubmit={onSubmit}
          loading={loading}
          submitText="Sign In"
          defaultValues={{
            email: "",
            password: "",
          }}
        />
      </div>
    </div>
  );
}
