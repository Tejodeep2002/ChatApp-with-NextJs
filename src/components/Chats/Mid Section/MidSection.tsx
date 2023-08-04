import React from "react";
import Header from "./Header";
import ChatList from "./ChatList";

const MidSection = () => {
  return (
    <div className="w-[31%] h-full p-5 border border-red-500 flex flex-col justify-between  items-center gap-6">
      <Header />
      <ChatList />
    </div>
  );
};

export default MidSection;
