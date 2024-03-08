"use client";
import React from "react";
import { signOut } from "next-auth/react";

type UserInfoProps = {
  user: {
    name: string | null | undefined;
    email: string | null | undefined;
    picture?: string;
  };
};
const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="h-full flex items-center justify-center gap-5">
      <div>
        Email:
        {user.email}
      </div>
      <div className="capitalize">{user.name}</div>
      <div
        onClick={handleSignOut}
        className="w-[100px] py-2 text-center rounded-md cursor-pointer bg-slate-900 transition-all duration-150 hover:bg-slate-800"
      >
        Sign out
      </div>
    </div>
  );
};
export default UserInfo;
