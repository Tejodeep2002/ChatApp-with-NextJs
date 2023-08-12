"use client";
import React, { FC, useEffect, useState } from "react";
import Chats from "./Chats";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  useAccessChatMutation,
  useFetchChatsQuery,
} from "@/lib/redux/api/apiChatSlice";

import { SearchUser } from "@/lib/redux/api/apiUserSlice";
import { updateSelectedChat } from "@/lib/redux/Slices/chatSlice";
import Image from "next/image";
import { getImage, getPicture } from "@/lib/utils";
import UserListItems from "./UserListItems";
import { getSession, useSession } from "next-auth/react";

export interface ChatListProps {
  result: SearchUser[];
  isLoading: any;
}
const ChatList: FC<ChatListProps> = ({ result, isLoading }) => {
  const [accessChat] = useAccessChatMutation();
  const chats = useAppSelector((state) => state.chats.chats);
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();

  console.log(session);

  // useEffect(() => {}, []);

  // console.log(session);
  return (
    <div className="w-full h-full border border-green-500 overflow-y-scroll scroll-smooth">
      {result.length !== 0
        ? result.map((item) => (
            <UserListItems
              id={item.id}
              image={item.pic}
              name={item.name}
              key={item.id}
              onAccess={() => accessChat({ userId: item.id })}
            />
          ))
        : chats.map((item) => (
            <Chats
              id={item.id}
              image={getImage(session?.user.id, item)}
              name={item.name}
              key={item.id}
              onAccess={() => accessChat(item.id)}
            />
          ))}
    </div>
  );
};

export default ChatList;
