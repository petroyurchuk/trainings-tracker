import { authOptions } from "@/auth";
import { BgProvider } from "@/components";
import Form from "@/components/Form";
import { getServerSession } from "next-auth";

export default async function Authentication() {
  const session = await getServerSession(authOptions);
  return (
    <main className=" min-h-screen grid place-items-center">
      <BgProvider>
        <Form isLogged={!!session} />
      </BgProvider>
    </main>
  );
}
