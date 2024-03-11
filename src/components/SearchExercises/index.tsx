"use client";

import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { fetchData } from "@/utils/fetchData";
import { Exercise } from "@/types/exercise";

const SearchExercises: React.FC = () => {
  const [searchField, setSearchField] = React.useState("");
  const [exercises, setExercises] = React.useState<Exercise[]>();
  const [bodyParts, setBodyParts] = React.useState<string[]>();

  React.useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData<string>(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList"
      );
      if (!bodyPartsData) return;
      setBodyParts(["all", ...bodyPartsData]);
    };
  }, []);

  const handleSearch = async () => {
    if (searchField) {
      try {
        const exercisesData = await fetchData<Exercise>(
          "https://exercisedb.p.rapidapi.com/exercises"
        );
        if (!exercisesData)
          throw new Error("Something went wrong while fetching data");
        const searchedExercises = exercisesData.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(searchField) ||
            exercise.target.toLowerCase().includes(searchField) ||
            exercise.equipment.toLowerCase().includes(searchField) ||
            exercise.bodyPart.toLowerCase().includes(searchField)
        );
        setSearchField("");
        setExercises(searchedExercises);
        console.log(exercisesData);
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
    </Stack>
  );
};
export default SearchExercises;
