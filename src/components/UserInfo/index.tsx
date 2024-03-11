"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Role } from "@prisma/client";

type UserInfoProps = {
  user: {
    name: string | null | undefined;
    email: string | null | undefined;
    picture?: string;
    role: Role;
  };
};
const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) throw new Error("User isn't signed in");

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth" });
  };

  return (
    <div className="h-full flex items-center justify-center gap-5">
      <div>
        Email:
        {user.email}
      </div>
      <div>Role: {user.role}</div>
      <div className="capitalize">{user.name}</div>
      <div
        onClick={handleSignOut}
        className="w-[100px] text-white py-2 text-center rounded-md cursor-pointer bg-slate-800 transition-all duration-150 hover:bg-slate-700"
      >
        Sign out
      </div>
    </div>
  );
};
export default UserInfo;
