import { getClientWithInvoicesByUserId } from "@/actions/clients";
import { getSession } from "@/actions/getSession";
import ClientsTable from "@/components/clients-table";
import Main from "@/components/main";
import Unauthorized from "@/components/unauthorized";

export default async function Clients() {
  const user = await getSession();

  if (!user) {
    return <Unauthorized />
  }

  const clients = await getClientWithInvoicesByUserId(user.id);

  return (
    <Main>
      <ClientsTable clients={clients} />
    </Main>
  );
}
