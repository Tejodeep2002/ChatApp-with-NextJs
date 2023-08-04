import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { generateJwtToken } from "@/lib/token/token";
import { passwordCompare } from "@/lib/passwordHasher/hasher";

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Please Enter all fields" },
      { status: 400 }
    );
  }

  if (typeof email === "string" && typeof password === "string") {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await passwordCompare(password, user.password))) {
      const responce = NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateJwtToken(user.id),
      });

      responce.cookies.set({
        name: "token",
        value: generateJwtToken(user.id),
        httpOnly: true,
        maxAge: 60 * 60,
      });


      return responce;
    } else {
      return NextResponse.json(
        { error: "Invalid Email or Password" },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Please give only string value" },
      { status: 400 }
    );
  }
};
