"use client";

import React from "react";
import Link from "next/link";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { data } = useSession();
  return (
    <Stack
      direction="row"
      sx={{
        gap: {
          sm: "122px",
          xs: "40px",
        },
        mt: {
          sm: "32px",
          xs: "20px",
        },
        px: "20px",
      }}
    >
      <Link href={"/"}>
        <Image
          width={48}
          height={48}
          src="/images/Logo.png"
          alt="logo image"
          className="my-0 mx-5"
        />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <a href="#exercises" className="decoration-0 text-[#3A1212]">
          Exercises
        </a>
        {!!data ? (
          <>
            <Link
              className="decoration-0 text-[#3A1212] border-b-2 border-[#FF2625]"
              href={"/profile"}
            >
              Profile
            </Link>
            <Link href={"/community"}>Community</Link>
            <Link href={"/workouts"}>Workouts</Link>
          </>
        ) : (
          <Link href={"/auth"}>Log In</Link>
        )}
      </Stack>
    </Stack>
  );
};
export default Navbar;
