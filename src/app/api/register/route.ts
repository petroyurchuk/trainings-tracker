import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const isAlreadyExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isAlreadyExist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        workouts: {
          create: [],
        },
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("Error occurred while registering!: " + error);
    return NextResponse.json(
      { message: "Error occurred while registering!" },
      { status: 500 }
    );
  }
}
