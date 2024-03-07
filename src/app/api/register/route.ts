import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return NextResponse.error();
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}
