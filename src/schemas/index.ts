import * as z from "zod"
type Infer<T extends z.ZodTypeAny> = z.infer<T>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6),
});

export const clientSchema = z.object({
  email: z.string().email("Invalid email format").or(z.literal("")).optional(),
  name: z.string().min(1),
});

export const invoiceSchema = z.object({
  amount: z.coerce.number(),
  client: z.string(),
});


export type LoginSchemaType = Infer<typeof loginSchema>;
export type ClientSchemaType = Infer<typeof clientSchema>;
export type InvoiceSchemaType = Infer<typeof invoiceSchema>;