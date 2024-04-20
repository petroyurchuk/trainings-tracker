import prisma from "@/utils/prismadb";
import getCurrentUser from "./getCurrentUser";
import { Workout } from "@/types/workout";

export const getAllWorkouts = async (): Promise<Workout[]> => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Cannot find user");
  const workouts = await prisma.workout.findMany({
    where: {
      userId: user.id,
    },
  });

  return workouts;
};

export const getWorkoutById = async (id: string): Promise<Workout> => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id,
      },
    });
    if (!workout) throw new Error("Cannot find this workout");

    return workout;
  } catch (error: any) {
    throw new Error(error);
  }
};
