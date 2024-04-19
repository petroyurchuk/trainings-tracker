import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { id } = body;
    const isExist = await prisma.workout.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      return NextResponse.json({ message: "Cannot find workout with this id" });
    }
    const newExercise = await prisma.exercise.create({
      data: {
        nameOfExercise: "",
        sets: 0,
        repetitions: [],
        weights: [],
        workoutId: id,
      },
    });
    return NextResponse.json(newExercise);
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
