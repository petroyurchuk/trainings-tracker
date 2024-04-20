"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { ExerciseForm } from "@/components";
import { Exercise, Workout } from "@/types/workout";

type WorkoutDetailProps = {
  workout: Workout;
  exercises: Exercise[];
};
const WorkoutDetail: React.FC<WorkoutDetailProps> = ({
  workout,
  exercises,
}) => {
  const router = useRouter();
  const [nameWorkout, setNameWorkout] = React.useState(workout.name);
  const handleAddExercise = async () => {
    await axios.post("/api/exercise", { id: workout.id });
    router.refresh();
  };
  const durationInMilliseconds = Math.abs(
    workout.endTime.getTime() - workout.startTime.getTime()
  );

  const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((durationInMilliseconds / (1000 * 60)) % 60);
  const seconds = Math.floor((durationInMilliseconds / 1000) % 60);
  const handleEndWorkout = async () => {
    const data = {
      nameOfWorkout: nameWorkout,
      endWorkoutTime: new Date(),
    };
    await axios.patch(`/api/workout/${workout.id}`, data);
    router.refresh();
  };

  return (
    <Box className="p-4 bg-slate-950 min-h-screen">
      <Stack spacing={2} direction="column">
        <Button
          variant="outlined"
          sx={{ width: { xs: "100%", md: "100px" }, color: "white" }}
          color="info"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <TextField
          label="Name of Workout"
          variant="outlined"
          value={nameWorkout}
          onChange={(e) => setNameWorkout(e.target.value)}
          fullWidth
          className="bg-white text-black"
        />
        <Typography variant="h4" className="text-white mt-5">
          Exercises
        </Typography>
        {exercises.map((exercise) => (
          <ExerciseForm key={exercise.id} exercise={exercise} />
        ))}
        <Stack spacing={2} alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddExercise}
            sx={{
              width: {
                xs: "90%",
                md: "30%",
              },
            }}
          >
            Add Exercise
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleEndWorkout}
            sx={{
              width: {
                xs: "90%",
                md: "30%",
              },
            }}
          >
            End Workout
          </Button>
        </Stack>
        <Typography variant="h6" className="text-white">
          Duration:{" "}
          {`${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
        </Typography>
      </Stack>
    </Box>
  );
};
export default WorkoutDetail;
