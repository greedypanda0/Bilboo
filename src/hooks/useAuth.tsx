"use client";

import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const signIn = () => {
    router.push("/login");
  };

  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    session: user,
    signIn,
    signOut,
  };
}
