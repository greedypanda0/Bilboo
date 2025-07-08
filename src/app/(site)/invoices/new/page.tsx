import { CardWrapper } from "@/components/ui/card-wrapper";
import Main from "@/components/main";
import { NewInvoiceForm } from "@/components/invoice/newInvoiceForm";
import { getClients } from "@/actions/clients";
import { getSession } from "@/actions/getSession";
import { redirect } from "next/navigation";

export default async function New() {
  const user = await getSession();
  if (!user) redirect("/auth/login");
  const clients = await getClients();

  return (
    <Main className="max-w-xl">
      <CardWrapper
        headerTitle="Create new client"
        headerLabel="Enter client details"
      >
        <NewInvoiceForm clients={clients} />
      </CardWrapper>
    </Main>
  );
}
