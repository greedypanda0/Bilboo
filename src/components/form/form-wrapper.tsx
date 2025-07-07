"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { formProps } from "@/types";
import { useForm } from "react-hook-form";
import { CardFooter } from "../ui/card";

export function FormWrapper<T extends ZodTypeAny>({
  schema,
  fields,
  action,
  defaultValues,
  submitText = "Submit",
  cancelText,
  loading = false,
  onCancel,
}: formProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(action)} className="space-y-4 w-full">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "select" && field.options ? (
                    <select
                      {...f}
                      className="w-full border rounded-md p-2 bg-background text-foreground"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      {...f}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <CardFooter className="p-0">
          <div className="flex w-full gap-4">
            {cancelText && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel || (() => router.back())}
                className="flex-1"
              >
                {cancelText}
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitText}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form>
  );
}
