"use client";

import React from "react";
import { Box } from "@mui/material";
import { Detail, ExerciseVideos } from "@/components";
import { Exercise } from "@/types/exercise";
import { fetchData, optionsYoutube } from "@/utils/fetchData";
import { YOUTUBE_VIDEOS_API_URL } from "@/constants";
import { VideoT } from "@/types/video";

type ExerciseDetailProps = {
  id: string;
};

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ id }) => {
  const actualExercises: Exercise[] = JSON.parse(
    localStorage.getItem("exercises")!
  );
  const details = actualExercises.filter((exercise) => exercise.id === id)[0];
  const [exerciseVideos, setExerciseVideos] = React.useState<VideoT>(
    JSON.parse(localStorage.getItem("exerciseVideos")!) || []
  );
  console.log(exerciseVideos);
  React.useEffect(() => {
    const fetchYoutubeVideos = async () => {
      if (!localStorage.getItem("exerciseVideos")) {
        const data = await fetchData<VideoT[]>(
          `${YOUTUBE_VIDEOS_API_URL}/search?query=${details.name}`,
          optionsYoutube
        );
        localStorage.setItem("exerciseVideos", JSON.stringify(data));
      }
    };
    fetchYoutubeVideos();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetails={details} />
      <ExerciseVideos name={details.name} exerciseVideos={exerciseVideos} />
      {/* <SimilarExercises /> */}
    </Box>
  );
};
export default ExerciseDetail;
