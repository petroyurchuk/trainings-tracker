import { BgProvider } from "@/components";
import Form from "@/components/Form";

export default function Home() {
  return (
    <main className=" min-h-screen grid place-items-center">
      <BgProvider>
        <Form />
      </BgProvider>
    </main>
  );
}
