"use server";

import prisma from "@/utils/prismadb";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
