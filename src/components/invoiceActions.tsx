import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import useFormSubmit from "@/hooks/useFormSubmit";

export function InvoiceActions({
  invoice,
  refetch,
}: {
  invoice: { id: string; status: string };
  refetch: () => void;
}) {
  const { submit } = useFormSubmit({
    path: "/api/invoices",
  });
  const markAsPaid = async () => {
    if (invoice.status === "PAID") {
      return toast.error("Invoice already paid");
    }
    const res = await submit(
      {
        status: "PAID",
      },
      `/api/invoices/${invoice.id}`
    );
    if (res) return refetch();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={markAsPaid}>Mark as Paid</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
