import prisma from "@/utils/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];
    if (!id) return NextResponse.json("Cannot find client id");

    const clientWorkout = await prisma.workout.create({
      data: {
        name: `Client Workout ${new Date().toLocaleDateString()}`,
        startTime: new Date(),
        clientId: id,
        endTime: new Date(),
      },
    });

    if (!clientWorkout)
      return NextResponse.json(
        "Something went wrong during creation client workout"
      );

    return NextResponse.json(clientWorkout);
  } catch (error) {
    NextResponse.error();
  }
}
