import { getSession } from "@/actions/getSession";
import { getInvoicesByUserId } from "@/actions/invoices";
import InvoicesTable from "@/components/invoices-table";
import Main from "@/components/main";
import Unauthorized from "@/components/unauthorized";

export default async function Invoices() {
  const user = await getSession();

  if (!user) {
    return <Unauthorized />;
  }

  const invoices = await getInvoicesByUserId(user.id);
  const sanitizedInvoices = invoices.map((invoice) => ({
    ...invoice,
    amount: invoice.amount.toNumber(),
  }));

  return (
    <Main>
      <InvoicesTable invoices={sanitizedInvoices} />
    </Main>
  );
}
