import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "./prisma";

export async function handleRevenue(invoice: {
  status: string;
  amount: Decimal;
  id: string;
  userId: string;
}) {
  if (invoice.status !== "PAID") return;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed

  try {
    await prisma.revenue.upsert({
      where: {
        month_year_userId: {
          userId: invoice.userId,
          year,
          month,
        },
      },
      update: {
        total: {
          increment: invoice.amount.toNumber(),
        },
      },
      create: {
        userId: invoice.userId,
        year,
        month,
        total: invoice.amount.toNumber(),
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Unknown error";

    console.error("error while updating revenue", message);
  }
}
