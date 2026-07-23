import { headers } from "next/headers";
import { auth } from "../lib/auth";

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  console.log(session, 'root');

  return (
    <div>
      ldfkj
    </div>
  );
}