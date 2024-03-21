import Link from "next/link";
import { Typography, Stack } from "@mui/material";
import { Exercise } from "@/types/exercise";
import Image from "next/image";
import { Button } from "..";

type ExerciseCardProps = {
  exercise: Exercise;
};
const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <Link
      href={`/exercise/${exercise.id}`}
      className="flex flex-col items-center"
    >
      <Image
        unoptimized
        width={250}
        height={250}
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
      />
      <Stack direction="row" gap="5px">
        <Button>{exercise.bodyPart}</Button>
        <Button styles={{ background: "#fcc757" }}>{exercise.target}</Button>
      </Stack>
      <Typography
        textAlign="center"
        mt="11px"
        fontWeight="bold"
        textTransform="capitalize"
        fontSize="22px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};
export default ExerciseCard;
