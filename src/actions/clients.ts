"use server";
import { prisma } from "@/lib/prisma";
import { ClientSchemaType } from "@/schemas";
import { getSession } from "./getSession";

export async function getClientsByUserId(id: string) {
  return prisma.client.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getClientWithInvoicesByUserId(id: string) {
  return prisma.client.findMany({
    where: {
      userId: id,
    },
    include: {
      invoices: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createClient(values: ClientSchemaType): Promise<{
  success?: boolean;
  error?: string;
}> {
  const user = await getSession();
  if (!user) return { error: "Inavlid request" };

  const client = await prisma.client.findFirst({
    where: {
      name: values.name,
    },
  });
  if (client) return { success: true };

  await prisma.client.create({
    data: {
      name: values.name,
      email: values.email,
      userId: user.id,
    },
  });

  return { success: true };
}
