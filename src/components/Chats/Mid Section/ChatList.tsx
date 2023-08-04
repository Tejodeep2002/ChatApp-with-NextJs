"use client";
import React, { useEffect } from "react";
import Chats from "./Chats";

const ChatList = () => {
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
