import { getSession } from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { clientSchema } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return Response.json({ error: "unauthorized req" });
  }

  const clients = await prisma.client.findMany({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
      email: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      invoices: {
        select: {
          id: true,
        },
      },
    },
  });

  return NextResponse.json({ clients });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name } = clientSchema.parse(body);
  const user = await getSession();
  if (!user) {
    return Response.json({ error: "unauthorized req" });
  }

  const res = await prisma.client.create({
    data: {
      name: name,
      email: email,
      userId: user.id,
    },
  });

  return Response.json({
    client: res,
  });
}
