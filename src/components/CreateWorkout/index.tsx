"use client";
import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

type CreateWorkoutProps = {
  idLastWorkout: string;
};

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ idLastWorkout }) => {
  const router = useRouter();
  const handleCreateWorkout = async () => {
    try {
      await axios.post("/api/workout/");
      router.push(`/workouts/${idLastWorkout}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleCreateWorkout} variant="contained">
        Add workout
      </Button>
    </div>
  );
};
export default CreateWorkout;
