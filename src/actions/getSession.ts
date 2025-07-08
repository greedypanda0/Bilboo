"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserByID } from "./user";

export async function getSession(): Promise<{
  name: string;
  id: string;
  email: string;
} | null> {
  const cookieStoe = await cookies();
  const token = cookieStoe.get("token")?.value;

  if (!token) return null;

  const jwt_parsed = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  if (!jwt_parsed) return null;

  const user = await getUserByID(jwt_parsed.userId);
  if (!user) return null;

  return user;
}
