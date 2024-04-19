import { getAllExercises } from "@/actions/getAllExercises";
import { getWorkoutById } from "@/actions/getAllWorkouts";
import { WorkoutDetail } from "@/components";

type WorkoutPageProps = {
  params: {
    id: string;
  };
};
const WorkoutPage: React.FC<WorkoutPageProps> = async ({ params }) => {
  const workout = await getWorkoutById(params.id);
  const exercises = await getAllExercises(params.id);
  return (
    <div>
      <WorkoutDetail workout={workout} exercises={exercises} />
    </div>
  );
};
export default WorkoutPage;
