import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { verifyJwtToken } from "@/lib/token/token";
import { passwordHasher } from "@/lib/passwordHasher/hasher";

export const PUT = async (request: NextRequest) => {
  const { userId, password } = await request.json();

  if (!password) {
    return NextResponse.json({ error: "Please Enter field" }, { status: 400 });
  }

  if (typeof password === "string") {
    const decoded: any = await verifyJwtToken(userId);

    try {
      const user = await prisma.user.update({
        where: {
          id: decoded.id,
        },
        data: {
          password: await passwordHasher(password),
        },
      });

      return NextResponse.json(user);
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { error: "Password not Updated" },
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
