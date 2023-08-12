import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { auth } from "@/lib/Middleware/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export const PUT = async (request: NextRequest) => {
  // const token = new Headers(request.headers).get("authorization");
  const session = await getServerSession(authOptions);
  const { chatId, name, description, groupImage, groupAdmin } =
    await request.json();

  // if (token === null) {
  //   return NextResponse.json({ error: "Unexpected Token " }, { status: 400 });
  // }
  // const authuser = await auth(token);

  if (!session) {
    return NextResponse.json("Not authorized, token failed", { status: 401 });
  } else if (!chatId || !name || !description || !groupImage || !groupAdmin) {
    return NextResponse.json("Please Fill all the fields");
  }

  if (
    typeof chatId === "string" &&
    typeof name === "string" &&
    typeof description === "string" &&
    typeof groupImage === "string" &&
    typeof groupAdmin === "string"
  ) {
    console.log(chatId, name, groupImage, groupAdmin);
    try {
      const isChat = await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          chatName: name,
          description,
          groupImage,
          groupAdmin: {
            connect: { id: groupAdmin },
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
      console.log(isChat);
      return NextResponse.json(isChat);
    } catch (error) {
      return NextResponse.json({error:"Error Happened! Update failed"}, {
        status: 404,
      });
    }
  } else {
    return NextResponse.json(
      { error: "Please give only string value" },
      { status: 400 }
    );
  }
};
