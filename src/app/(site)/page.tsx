import { getClientsByUserId } from "@/actions/clients";
import { getSession } from "@/actions/getSession";
import { getInvoicesByUserId } from "@/actions/invoices";
import Main from "@/components/main";

export default async function Home() {
  const user = await getSession()!;
  const clients = await getClientsByUserId(user?.id)
  return <Main>{JSON.stringify(clients)}</Main>;
}
