export type Workout = {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  userId: string | null;
  clientId: string | null;
};
export type Exercise = {
  id: string;
  nameOfExercise: string;
  sets: number;
  repetitions: number[];
  weights: number[];
  workoutId: string | null;
  muscleGroupIDs: string[];
};
