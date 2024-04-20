"use client";

import React from "react";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { Exercise } from "@/types/workout";
import axios from "axios";

type ExerciseFormProps = {
  exercise: Exercise;
};
type currentSetInfoT = {
  repetitions: number;
  weight: number;
};

const ExerciseForm: React.FC<ExerciseFormProps> = ({ exercise }) => {
  const [exerciseName, setExerciseName] = React.useState(
    exercise.nameOfExercise
  );
  const [exerciseSets, setExerciseSets] = React.useState(exercise.sets);
  const [currentSet, setCurrentSet] = React.useState<number>(0);
  const arr = Array.from({ length: exercise.sets }, (_v, index) => ({
    repetitions: exercise.repetitions[index] || 0,
    weight: exercise.weights[index] || 0,
  }));
  const [currentSetInfo, setCurrentSetInfo] =
    React.useState<currentSetInfoT[]>(arr);
  const handleSetChange = (newSetCount: number) => {
    setExerciseSets(newSetCount);
    setCurrentSetInfo((prev) => {
      const currentLength = prev.length;
      if (newSetCount > currentLength) {
        return [
          ...prev,
          ...Array.from({ length: newSetCount - currentLength }, () => ({
            repetitions: 0,
            weight: 0,
          })),
        ];
      } else {
        return prev.slice(0, newSetCount);
      }
    });
  };
  const repetitions: number[] = [];
  const weights: number[] = [];
  currentSetInfo.map((info) => {
    repetitions.push(info.repetitions);
    weights.push(info.weight);
  });
  const handleUpdate = async () => {
    try {
      const data = {
        exerciseName,
        sets: exerciseSets,
        repetitions,
        weights,
      };
      axios.patch(`/api/exercise/${exercise.id}`, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="p-4 bg-gray-100 min-h-[400px]">
      <Paper elevation={3} className="p-20">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Exercise name"
              variant="outlined"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="bg-white"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantity of sets"
              variant="outlined"
              value={exerciseSets}
              onChange={(e) => handleSetChange(Number(e.target.value))}
              className="bg-white"
            />
          </Grid>
          <Grid item xs={12}>
            <Box className="flex gap-2 flex-wrap">
              {[...Array(exerciseSets)].map((_, idx) => (
                <Button
                  key={idx}
                  variant={idx === currentSet ? "contained" : "outlined"}
                  color={idx === currentSet ? "primary" : "inherit"}
                  onClick={() => setCurrentSet(idx)}
                  className="w-12"
                >
                  {idx + 1}
                </Button>
              ))}
            </Box>
          </Grid>
          {exerciseSets > 0 && (
            <Grid container mt={2} spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Enter repetitions"
                  variant="outlined"
                  value={currentSetInfo[currentSet]?.repetitions}
                  onChange={(e) => {
                    setCurrentSetInfo((prevState) => {
                      const newState = [...prevState];
                      newState[currentSet] = {
                        ...newState[currentSet],
                        repetitions: Number(e.target.value),
                      };
                      return newState;
                    });
                  }}
                  className="bg-white"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Enter weight in kilograms"
                  variant="outlined"
                  value={currentSetInfo[currentSet]?.weight}
                  onChange={(e) => {
                    setCurrentSetInfo((prevState) => {
                      const newState = [...prevState];
                      newState[currentSet] = {
                        ...newState[currentSet],
                        weight: Number(e.target.value),
                      };
                      return newState;
                    });
                  }}
                  className="bg-white"
                />
              </Grid>
            </Grid>
          )}
          <Grid container className="mt-4" justifyContent="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdate}
              sx={{
                paddingY: "8px",
                width: {
                  xs: "100%",
                  md: "50%",
                },
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default ExerciseForm;
