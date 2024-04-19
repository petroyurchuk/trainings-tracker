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
  const workouts = await getAllWorkouts();
  const workout = workouts.filter((workout) => workout.id === id)[0];
  return workout;
};
