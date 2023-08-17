import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { passwordHasher } from "@/lib/passwordHasher/hasher";

import { auth } from "@/lib/Middleware/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const query = request.nextUrl.searchParams.get("search");
  // const token = new Headers(request.headers).get("authorization");

  // if (token === null) {
  //   return NextResponse.json({ error: "Unexpected Token " }, { status: 400 });
  // }

  if (!session?.user.name || !session?.user.email) {
    return NextResponse.json("Not authorized, token failed", {
      status: 401,
    });
  }

  if (typeof query !== "string" && query !== "") {
    return NextResponse.json(
      { error: "Please give only string value" },
      { status: 400 }
    );
  }

  // const authUser = await auth(token);

  // if (!authUser) {
  //   return NextResponse.json("Not authorized, token failed", {
  //     status: 401,
  //   });
  // }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              notIn: [session.user.name],
            },
          },
          {
            email: {
              contains: query,
              notIn: [session.user.email],
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        pic: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};

export const POST = async (request: NextRequest) => {
  const { name, email, password, pic } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Please Enter all fields" },
      { status: 400 }
    );
  }

  if (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof password === "string"
  ) {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return NextResponse.json({ error: "User already Exist" });
    }

    const hashedPassword = await passwordHasher(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        pic,
      },
    });

    if (user) {
      return NextResponse.json({ success: " User Created" }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "failed to create User" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Please give only string value" },
      { status: 400 }
    );
  }
};
