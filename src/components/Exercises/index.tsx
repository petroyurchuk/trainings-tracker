"use client";

import React from "react";

import { Pagination, Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";

type ExercisesProps = {};
const Exercises: React.FC<ExercisesProps> = () => {
  const { exercises } = useAppSelector((state) => state.exercise);

  return (
    <Box
      id="exercises"
      sx={{
        mt: {
          lg: "110px",
        },
      }}
      mt="10px"
      p="20px"
    >
      <Typography variant="h3" mb="46px">
        Showing results
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: {
            lg: "110px",
            xs: "50px",
          },
        }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {exercises.map((exercise) => (
          <Box key={exercise.id}>{exercise.name}</Box>
        ))}
      </Stack>
    </Box>
  );
};
export default Exercises;
