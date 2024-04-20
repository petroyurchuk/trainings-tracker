import prisma from "@/utils/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, _response: NextResponse) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, phoneNumber, height, weight } = body;
    if (!currentUser) return NextResponse.json("You must logged in");
    const newClient = await prisma.client.create({
      data: {
        name,
        trainerId: currentUser.id,
        height,
        weight,
        phoneNumber,
      },
    });
    return NextResponse.json(newClient);
  } catch (error) {
    NextResponse.json({
      message: error,
    });
  }
}
