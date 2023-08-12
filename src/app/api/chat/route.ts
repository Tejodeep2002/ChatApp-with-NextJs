import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { auth } from "@/lib/Middleware/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export const GET = async (request: NextRequest) => {
  ///Fetch Chats
  const session = await getServerSession(authOptions);
  // const token = new Headers(request.headers).get("authorization");

  // if (token === null) {
  //   return NextResponse.json({ error: "Unexpected Token " }, { status: 400 });
  // }

  // const authUser = await auth(token);

  // if (!authUser) {
  //   return NextResponse.json("Not authorized, token failed", { status: 401 });
  // }
  if (!session?.user.id ) {
    return NextResponse.json("Not authorized, token failed", { status: 401 });
  }

  try {
    const isChat = await prisma.chat.findMany({
      where: {
        usersId: { has: session.user.id },
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
        latestMessage: {
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
        },
        groupAdmin: {
          select: {
            id: true,
            name: true,
            email: true,
            pic: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log(isChat);
    return NextResponse.json(isChat);
  } catch (error) {
    return NextResponse.json({ error: "Error Happends" }, { status: 400 });
  }
};

export const POST = async (request: NextRequest) => {
  ///Accessing and create new chats
  const session = await getServerSession(authOptions);
  // const token = new Headers(request.headers).get("authorization");
  const { userId } = await request.json();

  // if (token === null) {
  //   return NextResponse.json({ error: "Unexpected Token " }, { status: 400 });
  // }

  if (typeof userId === "string") {
    // const authUser = await auth(token);

    if (!session?.user.id) {
      return NextResponse.json("Not authorized, token failed", {
        status: 401,
      });
    } else 
    if (!userId) {
      return NextResponse.json("UserId param not sent with request", {
        status: 400,
      });
    }

    const isChat = await prisma.chat.findMany({
      where: {
        isGroupChat: false,
        usersId: { hasEvery: [session.user.id, userId] },
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
        latestMessage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log(isChat);

    if (isChat.length > 0) {
      return NextResponse.json(isChat[0]);
    }
    try {
      const createdChat = await prisma.chat.create({
        data: {
          chatName: "sender",
          isGroupChat: false,
          users: {
            connect: [
              {
                id: session.user.id,
              },
              {
                id: userId,
              },
            ],
          },
        },
      });

      const FullChat = await prisma.chat.findMany({
        where: {
          id: createdChat.id,
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
          createdAt: true,
          updatedAt: true,
        },
      });
      return NextResponse.json(FullChat[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error Happens !! Chat not created" },
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
