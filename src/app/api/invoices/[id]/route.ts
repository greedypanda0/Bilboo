import { getSession } from "@/lib/getSession";
import { handleRevenue } from "@/lib/handleRevenue";
import { prisma } from "@/lib/prisma";
import { invoiceStatusUpdateSchema } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "unauthorized req" }, { status: 401 });
  }

  const body = await req.json();
  const { status } = invoiceStatusUpdateSchema.parse(body);

  const updated = await prisma.invoice.update({
    where: {
      id,
      client: {
        userId: user.id,
      },
    },
    data: {
      status,
    },
  });
  await handleRevenue({
    id: updated.id,
    status: updated.status,
    amount: updated.amount,
    userId: user.id,
  });

  return NextResponse.json({ success: true, invoice: updated });
}
