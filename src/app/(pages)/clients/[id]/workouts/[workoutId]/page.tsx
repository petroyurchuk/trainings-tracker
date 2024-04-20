import { getAllExercises } from "@/actions/getAllExercises";
import { getWorkoutById } from "@/actions/getAllWorkouts";
import { WorkoutDetail } from "@/components";

type WorkoutClientPageProps = {
  params: {
    workoutId: string;
  };
};
const WorkoutClientPage = async ({ params }: WorkoutClientPageProps) => {
  const workout = await getWorkoutById(params.workoutId);
  const exercises = await getAllExercises(params.workoutId);
  return (
    <div>
      <WorkoutDetail workout={workout} exercises={exercises} />
    </div>
  );
};
export default WorkoutClientPage;
