import prisma from "@/utils/prismadb";
import getCurrentUser from "./getCurrentUser";

export const getAllClients = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    const clients = await prisma.client.findMany({
      where: {
        trainerId: currentUser.id,
      },
    });
    if (!clients) return null;
    return clients;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getClientById = async (id: string) => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });
    return client;
  } catch (error: any) {
    throw new Error(error);
  }
};
