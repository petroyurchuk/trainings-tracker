import React from "react";
import Link from "next/link";
import { Stack } from "@mui/material";
import Image from "next/image";

type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
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
      <Link href={"/home"}>
        <Image
          width={48}
          height={48}
          src="/images/Logo.png"
          alt="logo image"
          className="my-0 mx-5"
        />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          className="decoration-0 text-[#3A1212] border-b-2 border-[#FF2625]"
          href={"/home"}
        >
          Home
        </Link>
        <a href="#exercises" className="decoration-0 text-[#3A1212]">
          Exercises
        </a>
        <Link
          className="decoration-0 text-[#3A1212] border-b-2 border-[#FF2625]"
          href={"/profile"}
        >
          Profile
        </Link>
      </Stack>
    </Stack>
  );
};
export default Navbar;
