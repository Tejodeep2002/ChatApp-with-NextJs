import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface GroupBody {
  name: string;
  description: string;
  groupImage: string;
  users: string[];
}

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const { name, description, groupImage, users }: GroupBody =
    await request.json();
  if (!session?.user.id) {
    return NextResponse.json("Not authorized, token failed", { status: 401 });
  } else if (!name || !users) {
    return NextResponse.json("Please Fill all the fields");
  }

  if (
    typeof name === "string" &&
    typeof description === "string" &&
    typeof groupImage === "string"
  ) {
    if (users.length < 1) {
      return NextResponse.json(
        { error: "1 users are required to form a group chat" },
        { status: 400 }
      );
    }

    users.push(session.user.id);

    try {
      const groupChat = await prisma.chat.create({
        data: {
          chatName: name,
          isGroupChat: true,
          description,
          groupImage,
          users: {
            connect: users.map((usersId: string) => ({ id: usersId })),
          },
          groupAdmin: {
            connect: { id: session.user.id },
          },
        },
      });

      const FullChat = await prisma.chat.findMany({
        where: {
          id: groupChat.id,
        },
        select: {
          id: true,
          chatName: true,
          isGroupChat: true,
          users: {
            select: {
              id: true,
              name: true,
              email: true,
              pic: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          groupAdmin: {
            select: {
              id: true,
              name: true,
              email: true,
              pic: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      return NextResponse.json(FullChat[0]);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Error Happened!! Group not created Error Happened" },
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
