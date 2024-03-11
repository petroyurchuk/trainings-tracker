import NextAuth from "next-auth/next";
import { Role } from "@prisma/client";
import type { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      role: Role;
    };
  }
}
