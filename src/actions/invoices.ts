"use server";
import { prisma } from "@/lib/prisma";
import { InvoiceSchemaType } from "@/schemas";
import { InvoiceStatus } from "@prisma/client";

export async function getInvoicesByUserId(id: string) {
  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        client: {
          userId: id,
        },
      },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return invoices.map((invoice) => ({
      ...invoice,
      amount: invoice.amount.toNumber(),
    }));
  } catch (error) {
    console.error("Error fetching invoices by user ID:", error);
    return [];
  }
}

export async function getInvoicesByClientId(id: string) {
  try {
    return await prisma.invoice.findMany({
      where: {
        clientId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching invoices by client ID:", error);
    return [];
  }
}

export async function createInvoice(values: InvoiceSchemaType): Promise<{
  success?: boolean;
  error?: string;
}> {
  try {
    await prisma.invoice.create({
      data: {
        clientId: values.client,
        amount: values.amount,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { error: "Failed to create invoice" };
  }
}

export async function markPaid(id: string): Promise<{
  success?: boolean;
  error?: string;
}> {
  try {
    await prisma.invoice.update({
      where: { id },
      data: {
        status: InvoiceStatus.PAID,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error marking invoice as paid:", error);
    return { error: "Failed to mark invoice as paid" };
  }
}
