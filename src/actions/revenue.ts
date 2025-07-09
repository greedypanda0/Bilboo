import { prisma } from "@/lib/prisma";
import { getSession } from "./getSession";

export async function getRevenue() {
  try {
    const user = await getSession();
    if (!user) throw new TypeError("no user");
    const date = new Date();

    const revenue = await prisma.revenue.findMany({
      where: {
        userId: user.id,
        year: date.getFullYear(),
      },
      orderBy: [{ year: "asc" }, { month: "asc" }],
    });

    return revenue;
  } catch (error) {
    console.error("Error while fetching revenue:", error);
    return [];
  }
}

export async function addRevenue(amount: number): Promise<{
  success?: boolean;
  error?: string;
}> {
  try {
    const user = await getSession();
    if (!user) return { error: "Inavlid user" };

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    await prisma.revenue.upsert({
      where: {
        month_year_userId: {
          month,
          year,
          userId: user.id,
        },
      },
      update: {
        total: {
          increment: amount,
        },
      },
      create: {
        total: amount,
        userId: user.id,
        month,
        year,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding revenue:", error);
    return { error: "Could not add revenue" };
  }
}
