import { getSession } from "@/actions/getSession";
import { getInvoices } from "@/actions/invoices";
import { InvoicesTable } from "@/components/invoice/invoices-table";
import Main from "@/components/main";
import { redirect } from "next/navigation";

export default async function Invoices() {
  const user = await getSession();
  if (!user) redirect("/auth/login");
  const invoices = await getInvoices();

  return (
    <Main>
      <InvoicesTable invoices={invoices} />
    </Main>
  );
}
