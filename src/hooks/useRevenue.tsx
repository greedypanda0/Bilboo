"use client";

import type { Revenue } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useRevenue() {
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetch_revenue();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error("Error while fetching revenue", {
      description: error,
    });
  }, [error]);

  const fetch_revenue = async () => {
    try {
      const res = await fetch("/api/revenue").then((res) => res.json());
      if (res.error) {
        return setError(res.error);
      }

      setRevenue(res.revenue);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return { revenue, error, refresh: fetch_revenue };
}
