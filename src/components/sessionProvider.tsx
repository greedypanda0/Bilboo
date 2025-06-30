"use client";

import { useAuthStore } from "@/lib/authStore";
import { useEffect } from "react";

export function SessionProvider({
  user,
  children,
}: {
  user: { name: string; id: string; email: string } | null;
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
