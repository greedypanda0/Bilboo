import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { markPaid } from "@/actions/invoices";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function InvoiceActions({
  invoice,
}: {
  invoice: { id: string; status: string };
}) {
  const router = useRouter();
  const markAsPaid = async () => {
    markPaid(invoice.id);
    toast.success("Marked invoice as paid");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <form action={markAsPaid}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full text-left">
              Mark as Paid
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
