import { prisma } from "@/lib/prisma";

export async function getUserByID(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}
