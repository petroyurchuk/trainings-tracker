import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // const currentExercise = await prisma.exercise.findUnique({
    //   where: {
    //     id: params.id,
    //   },
    // });
    // if (!currentExercise) {
    //   return NextResponse.json("Cannot find exercise with this id");
    // }
    const body = await request.json();
    const { exerciseName, sets, repetitions, weights } = body;

    if (!exerciseName && !sets && !repetitions && !weights) {
      return NextResponse.json("Nothing to update");
    }

    const updatedExercise = await prisma.exercise.update({
      where: {
        id: params.id,
      },
      data: {
        nameOfExercise: exerciseName,
        sets,
        repetitions,
        weights,
      },
    });

    return NextResponse.json({ data: updatedExercise });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
