import { getClientWithInvoices } from "@/actions/clients";
import { getSession } from "@/actions/getSession";
import ClientsTable from "@/components/client/clients-table";
import Main from "@/components/main";
import { redirect } from "next/navigation";

export default async function Clients() {
  const user = await getSession()
  if(!user) redirect("/auth/login")
  const clients = await getClientWithInvoices();

  return (
    <Main>
      <ClientsTable clients={clients} />
    </Main>
  );
}
