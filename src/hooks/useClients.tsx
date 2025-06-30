"use client";

import { useEffect, useState } from "react";
import type { Client } from "@/lib/types";
import { toast } from "sonner";

export default function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetch_clients();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error("Error while fetching clients", {
      description: error,
    });
  }, [error]);

  const fetch_clients = async () => {
    try {
      const res = await fetch("/api/clients").then((res) => res.json());
      if (res.error) {
        return setError(res.error);
      }

      setClients(res.clients);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return { clients, error, refresh: fetch_clients };
}
