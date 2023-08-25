import { Button, CircularButton } from "@/components/ui/Button";
import { updateSelectedChat } from "@/lib/redux/Slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getImage, getSender } from "@/lib/utils";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

const ChatHeader = () => {
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const user = useAppSelector((state) => state.user);
  const dispatch =useAppDispatch()

  return (
    <div className="w-full h-14 px-6 py-4 bg-slate-300 flex items-center justify-between dark:bg-slate-700">
      <div className="  flex items-center gap-3">
        <Button className="md:hidden"  onClick={()=>dispatch(updateSelectedChat(undefined))}>
        <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <CircularButton>
          <img
            src={getImage(user, selectedChat!)}
            alt=""
            className="w-10 h-full border border-black rounded-full"
          />
        </CircularButton>
        <span className="font-bold dark:text-white">
          {getSender(user, selectedChat!)}
        </span>
      </div>
      <div className="flex">
        <Button variant="pink" size="base">
          <FontAwesomeIcon icon={faVideo} 
          className="dark:text-white"/>
        </Button>
        <Button variant="pink" size="base">
          <FontAwesomeIcon icon={faPhone} 
          className="dark:text-white"/>
        </Button>
        <Button variant="pink" size="base">
          <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} 
          className="dark:text-white"/>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
