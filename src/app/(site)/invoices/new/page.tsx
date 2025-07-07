import { CardWrapper } from "@/components/ui/card-wrapper";
import Main from "@/components/main";
import NewInvoiceForm from "@/components/newInvoiceForm";
import { getClientsByUserId } from "@/actions/clients";
import { getSession } from "@/actions/getSession";

export default async function New() {
  const user = await getSession();
  const clients = await getClientsByUserId(user.id);

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
