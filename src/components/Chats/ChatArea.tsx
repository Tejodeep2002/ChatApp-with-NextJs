import React from "react";
import TextBar from "./ChatArea/TextBar";
import ChatHeader from "./ChatArea/ChatHeader";

const ChatArea = () => {
  return (
    <div className="w-full h-full   justify-between  flex flex-col items-center">
      <ChatHeader />
      <div className="h-full"></div>
      <TextBar />
    </div>
  );
};

export default ChatArea;
