"use client";

import React from "react";
import { Button } from "@mui/material";
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
  const arr = Array.from({ length: exercise.sets }, (v, index) => ({
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
    <div className="flex flex-col gap-5">
      <div>
        <input
          type="text"
          placeholder="Exercise name..."
          className="outline-none border-[1px] border-gray-400 transition-all duration-150 focus:border-purple-600 mr-10"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity of sets... "
          className="outline-none border-[1px] border-gray-400 transition-all duration-150 focus:border-purple-600"
          value={exerciseSets}
          onChange={(e) => handleSetChange(Number(e.target.value))}
        />
      </div>
      <div className="space-x-5">
        {[...new Array(exerciseSets)].map((_set, idx) => (
          <div
            className={`size-[50px] border-[1px] border-gray-950 inline-flex justify-center items-center cursor-pointer ${idx === currentSet ? "bg-slate-900 text-white font-semibold" : ""}`}
            key={idx}
            onClick={() => setCurrentSet(idx)}
          >
            {idx + 1}
          </div>
        ))}
      </div>
      {exerciseSets ? (
        <div className="space-x-10">
          <input
            type="number"
            placeholder="Enter repetitions"
            className="outline-none border-[1px] border-gray-400 transition-all duration-150 focus:border-purple-600"
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
          />
          <input
            type="number"
            placeholder="Enter weight in kilograms"
            className="outline-none border-[1px] border-gray-400 transition-all duration-150 focus:border-purple-600"
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
          />
        </div>
      ) : null}
      <Button
        variant="outlined"
        color="success"
        sx={{
          maxWidth: "400px",
        }}
        onClick={handleUpdate}
      >
        Save
      </Button>
    </div>
  );
};
export default ExerciseForm;
