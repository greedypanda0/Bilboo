import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getSession() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true },
    });

    return user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return null;
    } else {
      return null;
    }
  }
}
