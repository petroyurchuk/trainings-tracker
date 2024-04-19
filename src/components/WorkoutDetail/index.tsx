"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
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
    <div className="relative">
      <Button variant="outlined" color="info" onClick={() => router.back()}>
        {"<--"}
      </Button>
      <span>Name of workout: </span>
      <input
        className="border-2 border-purple-500 w-[600px]"
        value={nameWorkout}
        onChange={(e) => {
          setNameWorkout(e.target.value);
        }}
      />{" "}
      <div className="flex mt-5">
        <Typography variant="h4" mr={65}>
          Exercises
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddExercise}
        >
          Add Exercise
        </Button>
      </div>
      <div>
        {exercises.map((exercise) => (
          <ExerciseForm key={exercise.id} exercise={exercise} />
        ))}
      </div>
      <Button
        variant="contained"
        color="warning"
        sx={{
          mt: "15px",
        }}
        onClick={handleEndWorkout}
      >
        End Workout
      </Button>
      <div>{`${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</div>
    </div>
  );
};
export default WorkoutDetail;
