"use client";

import { useEffect, useState } from "react";
import type { Invoice } from "@/lib/types";
import { toast } from "sonner";

export default function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetch_invoices();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error("Error while fetching invoices", {
      description: error,
    });
  }, [error]);

  const fetch_invoices = async () => {
    try {
      const res = await fetch("/api/invoices").then((res) => res.json());
      if (res.error) {
        return setError(res.error);
      }

      setInvoices(res.invoices);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return { invoices, error, refetch: fetch_invoices };
}
