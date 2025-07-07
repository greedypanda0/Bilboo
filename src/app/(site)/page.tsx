import { getSession } from "@/actions/getSession";
import Main from "@/components/main";

export default async function Home() {
  const user = await getSession()!;
  return (
    <Main>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Main>
  );
}
