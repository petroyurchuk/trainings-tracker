import React from "react";

type BgProviderProps = {
  children: React.ReactNode;
};
const BgProvider: React.FC<BgProviderProps> = ({ children }) => {
  return (
    <div
      className="h-full w-full bg-[url('/images/main-bg.jpg')] bg-no-repeat bg-center  bg-cover
     grid place-items-center"
    >
      {children}
    </div>
  );
};
export default BgProvider;
