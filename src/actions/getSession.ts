import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserByID } from "./user";

export async function getSession() {
  const cookieStoe = await cookies();
  const token = cookieStoe.get("token")?.value;
  if (!token) {
    return null
  }

  const jwt_parsed = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  if (!jwt_parsed) {
    return null
  }

  const user = await getUserByID(jwt_parsed.userId);
  return user
}
