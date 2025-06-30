import { getSession } from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { invoiceSchema } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return Response.json({ error: "unauthorized req" });
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      client: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      amount: true,
      status: true,
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

  return NextResponse.json({ invoices });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { client: client_name, amount } = invoiceSchema.parse(body);
  const user = await getSession();
  if (!user) {
    return Response.json({ error: "unauthorized req" });
  }

  const client = await prisma.client.findFirst({
    where: {
      userId: user.id,
      name: client_name,
    },
  });
  if (!client) {
    return Response.json({ error: "No client found with given name" });
  }

  const res = await prisma.invoice.create({
    data: {
      amount,
      clientId: client.id,
    },
  });

  return Response.json({
    invoice: res,
  });
}
