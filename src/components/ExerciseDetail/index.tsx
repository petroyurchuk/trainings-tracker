"use client";

import React from "react";
import { Box } from "@mui/material";
import { Detail } from "@/components";
import { Exercise } from "@/types/exercise";
import { fetchData, optionsYoutube } from "@/utils/fetchData";
import { YOUTUBE_VIDEOS_API_URL } from "@/constants";

type ExerciseDetailProps = {
  id: string;
};

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ id }) => {
  const actualExercises: Exercise[] = JSON.parse(
    localStorage.getItem("exercises")!
  );

  React.useEffect(() => {
    const fetchYoutubeVideos = async () => {
      const data = await fetchData<any[]>(
        YOUTUBE_VIDEOS_API_URL,
        optionsYoutube
      );
    };
  }, [id]);

  const details = actualExercises.filter((exercise) => exercise.id === id)[0];

  return (
    <Box>
      <Detail exerciseDetails={details} />
      {/* <ExerciseVideos /> */}
      {/* <SimilarExercises /> */}
    </Box>
  );
};
export default ExerciseDetail;
