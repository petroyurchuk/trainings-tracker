"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBodyParts } from "@/store/exercise/slice";
import { fetchData } from "@/utils/fetchData";
import { BodyPart } from "@/components";
import { BODY_PART_WIDTH } from "@/constants";

const HorizontalScrollBar: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const handleScrollLeft = (scrollAmount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= scrollAmount;
    }
  };
  const handleScrollRight = (scrollAmount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
    }
  };
  const dispatch = useAppDispatch();
  const { bodyParts } = useAppSelector((state) => state.exercise);
  React.useEffect(() => {
    const fetchBodyParts = async () => {
      if (!localStorage.getItem("bodyParts")) {
        const data = await fetchData<string>(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList"
        );
        localStorage.setItem("bodyParts", JSON.stringify(data));
        dispatch(setBodyParts(data!));
        return;
      }
      const data = JSON.parse(localStorage.getItem("bodyParts")!);
      dispatch(setBodyParts(data!));
    };
    fetchBodyParts();
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ArrowBackIos
        color="error"
        sx={{
          cursor: "pointer",
          alignSelf: "self-start",
          ml: 5,
        }}
        onClick={() => handleScrollLeft(BODY_PART_WIDTH)}
      />
      <div
        ref={containerRef}
        className="w-full overflow-x-scroll scroll-smooth whitespace-nowrap"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div
          className={`w-[${bodyParts.length * BODY_PART_WIDTH}px] flex items-center gap-[20px]`}
        >
          {bodyParts?.map((item, idx) => (
            <Box key={idx} m="0 40px">
              <BodyPart item={item} />
            </Box>
          ))}
        </div>
      </div>
      <ArrowForwardIos
        color="error"
        sx={{
          cursor: "pointer",
          alignSelf: "self-start",
          ml: 5,
        }}
        onClick={() => handleScrollRight(BODY_PART_WIDTH)}
      />
    </div>
  );
};
export default HorizontalScrollBar;
