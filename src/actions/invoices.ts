"use server";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function getInvoicesByUserId(id: string) {
  return prisma.invoice.findMany({
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
}

export async function getInvoicesByClientId(id: string) {
  return prisma.invoice.findMany({
    where: {
      clientId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function markPaid(id: string) {
  return prisma.invoice.update({
    where: {
      id,
    },
    data: {
      status: InvoiceStatus.PAID,
    },
  });
}
