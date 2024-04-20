import { Stack, Typography } from "@mui/material";
import { getAllClients } from "@/actions/getAllClients";
import { Clients } from "@/components";
import Link from "next/link";

const ClientsPage = async () => {
  const clients = await getAllClients();

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Your clients</Typography>
        <Link
          href={"/client-form"}
          className="w-[150px] py-2 border-sky-500 transition-all duration-150 text-xl bg-sky-400 text-white hover:bg-sky-300 text-center"
        >
          Add client
        </Link>
      </Stack>
      <Clients clients={clients} />
    </Stack>
  );
};
export default ClientsPage;
