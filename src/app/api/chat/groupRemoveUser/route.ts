import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const PUT = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const { chatId, userId } = await request.json();

if (!session) {
    return NextResponse.json("Not authorized, token failed", { status: 401 });
  } else if (!chatId || !userId) {
    return NextResponse.json("Please Fill all the fields");
  }

  if (typeof chatId === "string" && typeof userId === "string") {
    console.log(chatId, userId);
    try {
      const removeUser = await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          users: {
            disconnect: {
              id: userId,
            },
          },
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

      return NextResponse.json(removeUser);
    } catch (error) {
      return NextResponse.json(
        { error: "Error Happened! Update failed" },
        {
          status: 404,
        }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Please give only string value" },
      { status: 400 }
    );
  }
};
