import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher/ServerPusher";


export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  const { chatId, content } = await request.json();

  if (!session?.user.id) {
    return NextResponse.json("Not authorized, token failed", { status: 401 });
  } else if (!chatId || !content) {
    return NextResponse.json("Please Fill all the fields");
  }

  if (typeof chatId === "string" && typeof content === "string") {
    try {
      const message = await prisma.message.create({
        data: {
          sender: {
            connect: { id: session.user.id },
          },
          content,
          chat: {
            connect: { id: chatId },
          },
        },
        select: {
          id: true,
          sender: {
            select: {
              id: true,
              name: true,
              pic: true,
            },
          },
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const ChatUpdate = await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          latestMessage: {
            connect: {
              id: message.id,
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
            },
          },
          groupAdmin: {
            select: {
              id: true,
              name: true,
              email: true,
              pic: true,
            },
          },
          latestMessage: {
            select: {
              id: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      const res = { ...message, chat: ChatUpdate };

     

      return NextResponse.json(res);
    } catch (error) {
      return NextResponse.json(
        { error: "Message sent failed" },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Please give only string value" },
      { status: 400 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  ////getAllMessages
  const session = await getServerSession(authOptions);
  const query = request.nextUrl.searchParams.get("chatId");

  if (typeof query !== "string" && query !== "") {
    return NextResponse.json(
      { error: "Please give only string value" },
      { status: 400 }
    );
  }

  if (!session) {
    return NextResponse.json("Not authorized, token failed", {
      status: 401,
    });
  }

  try {
    const allMessage = await prisma.message.findMany({
      where: {
        chatMessageId: query,
      },
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            pic: true,
          },
        },
        content: true,
        chat: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(allMessage);
  } catch (error) {
    return NextResponse.json(error);
  }
};
