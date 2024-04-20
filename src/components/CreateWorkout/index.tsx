"use client";
import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Workout } from "@/types/workout";

type CreateWorkoutProps = {
  urlApi: string;
  urlClient: string;
};

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ urlApi, urlClient }) => {
  const router = useRouter();
  const handleCreateWorkout = async () => {
    try {
      const { data } = await axios.post<Workout>(`/api/${urlApi}/`);
      router.push(`/${urlClient}/${data.id}`);
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
