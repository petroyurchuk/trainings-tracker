import prisma from "@/utils/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getClientById } from "@/actions/getAllClients";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await getClientById(params.id);
    if (!client) return NextResponse.json("Client do not exist");
    const clientWorkouts = await prisma.workout.findMany({
      where: {
        clientId: client.id,
      },
    });

    return NextResponse.json({
      data: {
        client,
        clientWorkouts,
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
