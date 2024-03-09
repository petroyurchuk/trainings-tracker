import Link from "next/link";
import React from "react";

type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="max-w-[1200px] h-full m-auto flex">
      <nav className="w-full h-full">
        <ul className="w-full h-full flex justify-center items-center gap-5">
          {["Exercises catalog", "Journal of trainings", "Community"].map(
            (listItem, idx) => (
              <li
                className="uppercase tracking-wider transition-all duration-150 hover:underline font-semibold"
                key={idx}
              >
                <Link href={`/${listItem.split(" ").join("")}`}>
                  {listItem}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
      <Link
        className="leading-[60px] uppercase tracking-widest font-semibold transition-all duration-150 hover:tracking-[3px]"
        href={"/profile"}
      >
        Profile
      </Link>
    </header>
  );
};
export default Navbar;
