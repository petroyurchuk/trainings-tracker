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
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) {
          return null;
          // throw new Error("Password isn't correct");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email ?? undefined,
        },
      });

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (user && !dbUser) {
        return {
          ...token,
          id: user.id,
        };
      }
      return {
        id: dbUser?.id,
        name: dbUser?.name,
        email: dbUser?.email,
        picture: dbUser?.image,
        role: dbUser?.role,
      };
    },
    async session({ token, session }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            role: token.role,
          },
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
