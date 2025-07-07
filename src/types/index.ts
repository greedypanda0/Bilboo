import * as z from "zod";
import { ReactNode } from "react";
import { DefaultValues, Path } from "react-hook-form";
import { Client, Invoice } from "@prisma/client";

export type formPropsField<T extends z.ZodTypeAny> = {
  name: Path<z.infer<T>>;
  label: string;
  type?: "text" | "email" | "number" | "select" | "password";
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export type formProps<T extends z.ZodTypeAny> = {
  schema: T;
  fields: formPropsField<T>[];
  action: (values: z.infer<T>) => Promise<void>;
  defaultValues?: DefaultValues<z.infer<T>>;
  submitText?: string;
  loading?: boolean;
  cancelText?: string;
  onCancel?: () => void;
};

export type CardWrapperProps = {
  headerTitle: string;
  headerLabel?: string;
  children: ReactNode;
  cardFooter?: ReactNode;
};

export type ClientWithInvoiceIDs = Client & {
  invoices: { id: string }[];
};

export type InvoiceWithClient = Omit<Invoice, "amount"> & {
  amount: number;
  client: {
    name: string;
    email: string | null;
  };
};