import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateExercise } from "./types";
import { Exercise } from "@/types/exercise";

const initialState: InitialStateExercise = {
  exercises: [],
  bodyParts: [],
  bodyPart: "",
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setBodyPart: (state, action: PayloadAction<string>) => {
      state.bodyPart = action.payload;
    },
    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      state.exercises = action.payload;
    },
    setBodyParts: (state, action: PayloadAction<string[]>) => {
      state.bodyParts = action.payload;
    },
  },
});

export const { setExercises, setBodyParts, setBodyPart } =
  exerciseSlice.actions;
export default exerciseSlice.reducer;
