import { getSession } from "@/lib/getSession";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return Response.json({ error: "unauthorized req" });
  }

  const res = await prisma.revenue.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      month: true,
      year: true,
      total: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return Response.json({ revenue: res });
}
