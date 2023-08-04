import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/prisma";
import { verifyJwtToken } from "../token/token";

type User = {
  id: string;
  name: string;
  email: string;
  pic: string;
  createdAt: Date;
  updatedAt: Date;
};

export const auth = async (authToken: string) => {
  if (authToken && authToken.startsWith("Bearer")) {
    let token: string;

    token = authToken.split(" ")[1];

    //decode token id
    const decoded: any = verifyJwtToken(token);

    const user: User | null = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        pic: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user !== null) {
      return user;
    } else {
      return false;
    }
  } else {
    return false;
  }

  // if (!authToken) {
  //   return false;
  // }
};
