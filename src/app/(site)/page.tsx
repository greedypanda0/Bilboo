import { getSession } from "@/actions/getSession";
import Main from "@/components/main";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();
  if (!user) redirect("/auth/login");
  
  return (
    <Main>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Main>
  );
}
