"use client";
import React, { useEffect } from "react";
import Chats from "./Chats";
import { useGetAllChatsQuery } from "@/lib/redux/api/chatsSlice";
import { getAccessTokenFromCookie } from "@/lib/authFunction/auth";
import { useAppSelector } from "@/lib/redux/hooks";


const ChatList = () => {
  const store = useAppSelector((store) => store.user.token);
 

  useEffect(() => {
    console.log();
  }, []);

  return (
    <div className="w-full h-full border border-green-500 overflow-y-scroll scroll-smooth">
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
    </div>
  );
};

export default ChatList;
