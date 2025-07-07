"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserByID } from "./user";
import { redirect } from "next/navigation";

export async function getSession(): Promise<{
  name: string;
  id: string;
  email: string;
}> {
  const cookieStoe = await cookies();
  const token = cookieStoe.get("token")?.value;

  if (!token) redirect("/auth/login");

  const jwt_parsed = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  if (!jwt_parsed) redirect("/auth/login");

  const user = await getUserByID(jwt_parsed.userId);
  if (!user) redirect("/auth/login");

  return user;
}
