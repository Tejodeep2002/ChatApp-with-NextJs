import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { auth } from "@/lib/Middleware/auth";

export const GET = async (request: NextRequest) => {
  const token = new Headers(request.headers).get("authorization");
  if (token === null) {
    return NextResponse.json({ error: "Unexpected Token " }, { status: 400 });
  }
  const authUser = await auth(token);

  if (!authUser) {
    return NextResponse.json("Not authorized, token failed", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: authUser.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        pic: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
