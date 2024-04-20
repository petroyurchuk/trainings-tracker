import { Box, Container, Stack, Typography } from "@mui/material";
import { getClientById } from "@/actions/getAllClients";
import Link from "next/link";

type ClientPageProps = {
  params: {
    id: string;
  };
};
const ClientPage: React.FC<ClientPageProps> = async ({ params }) => {
  const client = await getClientById(params.id);
  return (
    <Container maxWidth="md">
      <Box
        boxShadow={3}
        p={4}
        bgcolor="background.paper"
        borderRadius={2}
        className="space-y-4"
      >
        <Typography variant="h4" className="text-blue-800">
          Name: {client?.name}
        </Typography>
        <Typography variant="h4" className="text-green-600">
          Phone number: {client?.phoneNumber || "N/A"}
        </Typography>
        <Typography variant="h4" className="text-purple-700">
          Height: {client?.height} cm
        </Typography>
        <Typography variant="h4" className="text-red-500">
          Weight: {client?.weight} kg
        </Typography>
        <Link
          className="text-3xl border-2 border-sky-800 p-2 rounded-md bg-slate-800 text-white inline-block mt-5 transition-all duration-150 hover:bg-slate-700 hover:border-sky-700"
          href={`${params.id}/workouts/`}
        >
          Workouts
        </Link>
      </Box>
    </Container>
  );
};
export default ClientPage;
