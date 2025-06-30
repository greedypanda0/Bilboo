import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type UseFormSubmitOptions = {
  path: string;
  successMessage?: string;
  errorMessage?: string;
};

export default function useFormSubmit<T>({
  path,
  successMessage = "Success!",
  errorMessage = "Something went wrong",
}: UseFormSubmitOptions) {
  const [loading, setLoading] = useState(false);

  const submit = async (values: T, _path?: string): Promise<T | null> => {
    setLoading(true);
    try {
      const res = await axios
        .post(_path ?? path, values, {
          headers: { "Content-Type": "application/json" },
        })
        .catch((error) => ({
          data: error,
        }));

      if (res.data?.error) {
        toast.error(res.data.error || errorMessage);
        return null;
      }

      toast.success(successMessage);
      return res.data;
    } catch (err: unknown) {
      console.error("Submission error:", err);

      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : errorMessage;

      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
}
