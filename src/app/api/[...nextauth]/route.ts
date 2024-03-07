import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/utils/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
        const isCorrectPassword = bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
