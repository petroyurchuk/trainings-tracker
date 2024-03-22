"use client";

import { Stack } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <InfinitySpin color="red" />
    </Stack>
  );
};
export default Loader;
