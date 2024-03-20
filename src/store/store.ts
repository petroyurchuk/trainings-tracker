import { configureStore } from "@reduxjs/toolkit";
import ExerciseReducer from "@/store/exercise/slice";
export const store = configureStore({
  reducer: {
    exercise: ExerciseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
