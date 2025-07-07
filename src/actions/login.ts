"use server";

import { prisma } from "@/lib/prisma";
import { LoginSchemaType } from "@/schemas";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function login(val: LoginSchemaType): Promise<{
  success?: boolean;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();

    const user = await prisma.user.findUnique({
      where: { email: val.email },
    });

    if (!user) {
      return { error: "Invalid email" };
    }

    const isPasswordValid = await bcrypt.compare(val.password, user.password);
    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15d" }
    );

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 15, // 15 days
      sameSite: "lax",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Something went wrong during login." };
  }
}
