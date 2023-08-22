"use client";
import React, { useEffect, useState } from "react";
import TextBar from "./TextBar";
import ChatHeader from "./ChatHeader";
import { useAppSelector } from "@/lib/redux/hooks";
import ScrollableChat from "./ScrollableChat";

const ChatArea = () => {
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);

  // const [socket, setSocket] = useState(null);

  return (
    <div
      className={` w-full  ${selectedChat ? "flex" : "hidden"} md:flex h-full`}
    >
      {selectedChat ? (
        <div className="w-full h-full flex flex-col justify-between">
          <ChatHeader />
          <ScrollableChat selectedChat={selectedChat} />
          <TextBar />
        </div>
      ) : (
        <div>No chat selected</div>
      )}
    </div>
  );
};

export default ChatArea;
