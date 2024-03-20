import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBodyPart } from "@/store/exercise/slice";
import { BODY_PART_WIDTH } from "@/constants";

type BodyPartProps = {
  item: string;
};
const BodyPart: React.FC<BodyPartProps> = ({ item }) => {
  const { bodyPart } = useAppSelector((state) => state.exercise);
  const dispatch = useAppDispatch();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        borderTop: bodyPart === item ? "4px solid #ff2625" : "",
        width: BODY_PART_WIDTH,
        borderBottomLeftRadius: 20,
        height: 150,
        cursor: "pointer",
        gap: 5,
      }}
      onClick={() => dispatch(setBodyPart(item))}
    >
      <Image src="/icons/gym.png" alt="icon" height={40} width={40} />
      <Typography
        fontSize={24}
        fontWeight="bold"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};
export default BodyPart;
