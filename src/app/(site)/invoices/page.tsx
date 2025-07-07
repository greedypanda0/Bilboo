import { getSession } from "@/actions/getSession";
import { getInvoicesByUserId } from "@/actions/invoices";
import InvoicesTable from "@/components/invoices-table";
import Main from "@/components/main";

export default async function Invoices() {
  const user = await getSession();
   const invoices = await getInvoicesByUserId(user.id);

  return (
    <Main>
      <InvoicesTable invoices={invoices} />
    </Main>
  );
}
