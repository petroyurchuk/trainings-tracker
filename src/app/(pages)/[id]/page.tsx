import { ExerciseDetail } from "@/components";

type ExerciseProps = {
  params: {
    id: string;
  };
};

const Exercise: React.FC<ExerciseProps> = ({ params }) => {
  return <ExerciseDetail id={params.id} />;
};
export default Exercise;
