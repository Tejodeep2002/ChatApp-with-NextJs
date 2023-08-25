"use client";
import Image from "next/image";
import React, { FC } from "react";

export interface ChatProps {
  id: string;
  image: string;
  name: string;
  latestMessage:string|undefined
  onAccess: any;
}

const Chats: FC<ChatProps> = ({ id, image, name, onAccess,latestMessage }) => {
  return (
    <button
      onClick={onAccess}
      className="w-full h-14 flex items-center px-3 py-2 bg-white border border-x-black"
    >
      <img
        src={image}
        alt="image"
        width={"36"}
        height={"36"}
        className="w-9 h-9 mr-6 bg-red-700 rounded-full"
      ></img>
      <div className="flex flex-col w-full items-start">
        <span className="text-lg">{name}</span>
        <span className="text-xs truncate">{latestMessage ?latestMessage : ""}</span>
      </div>
    </button>
  );
};

export default Chats;
