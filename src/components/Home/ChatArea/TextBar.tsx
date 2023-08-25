"use client";
import React, { FC, useState, useEffect } from "react";
import Emoji from "./Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faLink, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/Button";
import { useSendingNewMessageMutation } from "@/lib/redux/api/apiMessage";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addNewMessage } from "@/lib/redux/Slices/messageSlice";



const TextBar: FC = () => {
  const [textMessage, setTextMessage] = useState<string>();
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const [sendingNewMessage, isLoading] = useSendingNewMessageMutation();
  const dispatch = useAppDispatch();

  // socket

  const handleSend = async () => {
    if (!textMessage) {
      toast.error("Enter some input");
      return;
    }
    try {
      sendingNewMessage({
        content: textMessage,
        chatId: selectedChat?.id!,
      });
      setTextMessage("");
      
    } catch (error) {
      console.log("text send", error);
    }
  };
  return (
    <div className="w-full h-12 p-2 gap-3 bg-slate-300 flex items-center dark:bg-slate-700">
      {/* <Emoji/> */}

      <Button variant="pink" size="base">
        <FontAwesomeIcon icon={faFaceSmile} className="dark:text-white" />
      </Button>

      <Button variant="pink" size="base">
        <FontAwesomeIcon icon={faLink} className="dark:text-white" />
      </Button>
      <input
        type="text"
        id="small-input"
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        placeholder="Search or Start a new Chat"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <Button variant="pink" size="base" onClick={handleSend}>
        {textMessage ? (
          <FontAwesomeIcon icon={faPaperPlane} className="dark:text-white" />
        ) : (
          <FontAwesomeIcon icon={faMicrophone} className="dark:text-white" />
        )}
      </Button>
    </div>
  );
};

export default TextBar;
