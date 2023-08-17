"use client";
import React, { FC, useEffect, useState } from "react";
import Chats from "./Chats";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  useAccessChatMutation,
} from "@/lib/redux/api/apiChatSlice";

import { SearchUser } from "@/lib/redux/api/apiUserSlice";
import { updateSelectedChat } from "@/lib/redux/Slices/chatSlice";
import Image from "next/image";
import { getImage, getSender } from "@/lib/utils";
import UserListItems from "./UserListItems";
import { getSession, useSession } from "next-auth/react";

export interface ChatListProps {
  result: Chat[];
  isLoading: any;
}
const ChatList: FC<ChatListProps> = ({ result, isLoading }) => {
 
  const chats = useAppSelector((state) => state.chats.chats);
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();

  console.log(session);

  return (
    <div className="w-full h-full border border-green-500 overflow-y-scroll scroll-smooth">
      {result.map((item) => (
        <Chats
          id={item.id}
          image={getImage(session?.user.id, item)}
          name={getSender(session?.user.id, item)}
          key={item.id}
          onAccess={() => dispatch(updateSelectedChat(item))}
        />
      ))}
    </div>
  );
};

export default ChatList;
