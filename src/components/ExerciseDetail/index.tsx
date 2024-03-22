"use client";

import React from "react";
import { Box } from "@mui/material";
import {
  fetchSimilarExercisesByEquipment,
  fetchSimilarExercisesByTarget,
  fetchYoutubeVideos,
} from "@/utils/fetchData";
import { Detail, ExerciseVideos, SimilarExercises } from "@/components";
import { Exercise } from "@/types/exercise";
import { VideoT } from "@/types/video";

type ExerciseDetailProps = {
  id: string;
};

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ id }) => {
  const actualExercises: Exercise[] = JSON.parse(
    localStorage.getItem("exercises")!
  );
  const details = actualExercises.filter((exercise) => exercise.id === id)[0];
  const [exerciseVideos, setExerciseVideos] = React.useState<VideoT>();
  const [targetMuscleExercises, setTargetMuscleExercises] = React.useState<
    Exercise[]
  >([]);
  const [equipmentExercises, setEquipmentExercises] = React.useState<
    Exercise[]
  >([]);

  React.useEffect(() => {
    const fetchingData = async () => {
      const exerciseVideosData = await fetchYoutubeVideos(details.name);
      const targetExercisesData = await fetchSimilarExercisesByTarget(
        details.target
      );
      const equipmentExercisesData = await fetchSimilarExercisesByEquipment(
        details.equipment
      );
      setExerciseVideos(exerciseVideosData);
      setTargetMuscleExercises(targetExercisesData);
      setEquipmentExercises(equipmentExercisesData);
    };

    fetchingData();
  }, [id, details.name, details.target, details.equipment]);
  return (
    <Box>
      <Detail exerciseDetails={details} />
      <ExerciseVideos
        name={details.name}
        exerciseVideos={exerciseVideos ? exerciseVideos : ({} as VideoT)}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};
export default ExerciseDetail;
