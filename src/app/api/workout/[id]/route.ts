import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { nameOfWorkout, endWorkoutTime } = body;
    if (!endWorkoutTime && !nameOfWorkout) {
      return NextResponse.json("Nothing to update");
    }
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: params.id,
      },
      data: {
        name: nameOfWorkout,
        endTime: endWorkoutTime,
      },
    });

    return NextResponse.json({ data: updatedWorkout });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
