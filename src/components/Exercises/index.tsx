"use client";

import React from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setExercises } from "@/store/exercise/slice";
import { ExerciseCard } from "@/components";
import { EXERCISES_PER_PAGE } from "@/constants";
import { Exercise } from "@/types/exercise";

type ExercisesProps = {};
const Exercises: React.FC<ExercisesProps> = () => {
  const dispatch = useAppDispatch();
  const { exercises, bodyPart } = useAppSelector((state) => state.exercise);
  const [currentPage, setCurrentPage] = React.useState(1);
  const indexOfLastExercise = currentPage * EXERCISES_PER_PAGE;
  const indexOfFirstExercise = indexOfLastExercise - EXERCISES_PER_PAGE;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  React.useEffect(() => {
    if (bodyPart === "all") return;
    const actualExercises: Exercise[] = JSON.parse(
      localStorage.getItem("exercises")!
    );
    const exercisesByBodyPart = actualExercises.filter(
      (exercise) => exercise.bodyPart === bodyPart
    );
    dispatch(setExercises(exercisesByBodyPart));
  }, [bodyPart]);

  const paginate = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
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
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "repeat(3, 1fr)",
            md: "repeat(2,1fr)",
            sm: "repeat(1,1fr)",
          },
          justifyContent: "center",

          gap: {
            lg: "110px",
            xs: "50px",
          },
        }}
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / EXERCISES_PER_PAGE)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};
export default Exercises;
