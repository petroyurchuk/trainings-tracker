import prisma from "@/utils/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ message: "Cannot find user" });
    }

    const workouts = await prisma.workout.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    if (!workouts.length) {
      return NextResponse.json({ message: "Current user hasn't workouts yet" });
    }
    return NextResponse.json(workouts);
  } catch (error) {
    NextResponse.error();
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const currentUser = await getCurrentUser();
    const newWorkout = await prisma.workout.create({
      data: {
        name: `Workout ${new Date().toLocaleDateString()}`,
        startTime: new Date(),
        userId: currentUser?.id,
        endTime: new Date(),
      },
    });
    return NextResponse.json(newWorkout);
  } catch (error) {
    NextResponse.error();
  }
}
