import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { Typography } from "@mui/material";
import Image from "next/image";

export const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <Image
        width={50}
        height={20}
        src={"/icons/left-arrow.png"}
        alt="right-arrow"
      />
    </Typography>
  );
};

export const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="right-arrow">
      <Image
        width={50}
        height={20}
        src={"/icons/right-arrow.png"}
        alt="right-arrow"
      />
    </Typography>
  );
};
