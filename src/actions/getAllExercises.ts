import prisma from "@/utils/prismadb";

export const getAllExercises = async (workoutId: string) => {
  const exercises = prisma.exercise.findMany({
    where: {
      workoutId,
    },
  });
  return exercises;
};
