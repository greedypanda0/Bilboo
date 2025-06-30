import { InvoiceStatus } from "@prisma/client";
import { z } from "zod";

export type Client = {
  id: string;
  name: string;
  email?: string;
  user: {
    id: string;
    name: string;
  };
  invoices: { id: string }[];
};

export type Invoice = {
  id: string;
  client: {
    name: string;
    email: string;
  };
  status: string;
  amount: number;
};

export type Revenue = {
  id: string;
  year: number;
  month: number;
  total: number;
  user: {
    name: string;
    email: string;
  };
};

export const invoiceSchema = z.object({
  amount: z.coerce.number(),
  client: z.string(),
});

export const invoiceStatusUpdateSchema = z.object({
  status: z.enum([InvoiceStatus.PAID, InvoiceStatus.UNPAID]),
});

export const clientSchema = z.object({
  email: z.string().email("Invalid email format").or(z.literal("")).optional(),
  name: z.string(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
