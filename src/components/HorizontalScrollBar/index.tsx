"use client";

import React from "react";
import { Box } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { BodyPart, ExerciseCard } from "@/components";
import { BODY_PART_WIDTH } from "@/constants";

type HorizontalScrollBarProps = {
  data: string[] | any[];
  isBodyParts: boolean;
};

const HorizontalScrollBar: React.FC<HorizontalScrollBarProps> = ({
  data,
  isBodyParts,
}) => {
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

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        ref={containerRef}
        className="w-full overflow-x-scroll scroll-smooth whitespace-nowrap"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className={`w-[200%] flex items-center gap-[20px]`}>
          {data?.map((item, idx) => (
            <Box key={idx} m="0 40px">
              {isBodyParts ? (
                <BodyPart item={item} />
              ) : (
                <ExerciseCard exercise={item} />
              )}
            </Box>
          ))}
        </div>
      </div>
      <div className="self-end flex gap-5 mr-[40px] mt-5">
        <ArrowBackIos
          color={"error"}
          sx={{
            cursor: "pointer",
            "&:hover": {
              scale: "120%",
            },
          }}
          onClick={() => handleScrollLeft(BODY_PART_WIDTH)}
        />
        <ArrowForwardIos
          color="error"
          sx={{
            cursor: "pointer",
            "&:hover": {
              scale: "120%",
            },
          }}
          onClick={() => handleScrollRight(BODY_PART_WIDTH)}
        />
      </div>
    </div>
  );
};
export default HorizontalScrollBar;
