"use client";

import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBodyParts, setExercises } from "@/store/exercise/slice";
import { fetchBodyParts, fetchExercises } from "@/utils/fetchData";
import { Exercise } from "@/types/exercise";
import { HorizontalScrollBar } from "@/components";

const SearchExercises: React.FC = () => {
  const [searchField, setSearchField] = React.useState("");
  const { bodyParts } = useAppSelector((state) => state.exercise);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const fetchingData = async () => {
      const exercisesData = await fetchExercises();
      const bodyPartsData = await fetchBodyParts();
      dispatch(setExercises(exercisesData));
      dispatch(setBodyParts(bodyPartsData));
    };
    fetchingData();
  }, [dispatch]);

  const handleSearch = async () => {
    const actualExercises: Exercise[] = JSON.parse(
      localStorage.getItem("exercises")!
    );
    if (searchField) {
      try {
        const searchedExercises = actualExercises.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(searchField) ||
            exercise.target.toLowerCase().includes(searchField) ||
            exercise.equipment.toLowerCase().includes(searchField) ||
            exercise.bodyPart.toLowerCase().includes(searchField)
        );
        dispatch(setExercises(searchedExercises));
        setSearchField("");
      } catch (error) {
        console.log("Error while fetching data in component: ", error);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight="700"
        mb={10}
        sx={{
          fontSize: {
            lg: "44px",
            xs: "30px",
          },
        }}
      >
        Awesome Exercises <br /> You Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value.toLowerCase());
          }}
          placeholder="Search Exercises"
          type="text"
          sx={{
            height: "76px",
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: {
              lg: "800px",
              xs: "350px",
            },

            borderRadius: "40px",
          }}
        />
        <Button
          variant="contained"
          color="error"
          sx={{
            color: "#fff",
            textTransform: "none",
            width: {
              lg: "175px",
              xs: "80px",
            },
            fontSize: {
              lg: "20px",
              sm: "14px",
            },
            height: "56px",
            position: "absolute",
            right: "0",
            ":hover": {
              boxShadow: "1px 1px 10px #ff2526",
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <HorizontalScrollBar data={bodyParts} isBodyParts />
    </Stack>
  );
};
export default SearchExercises;
