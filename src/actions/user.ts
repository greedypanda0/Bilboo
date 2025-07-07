import { prisma } from "@/lib/prisma";

export async function getUserByID(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      id: true
    },
  });
}
