"use client";
import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import {
  SearchUser,
  useSearchUserMutation,
} from "@/lib/redux/api/apiUserSlice";
import { Button } from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ChatList from "./ChatList";
import { useFetchChatsQuery } from "@/lib/redux/api/apiChatSlice";

import { useAppSelector } from "@/lib/redux/hooks";
import CreateChatModal from "./Modals/CreateChatModal";
import { getSender } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import axios from "axios";

const MidSection = () => {
  const [result, setResult] = useState<Chat[]>([]);
  const [searchUser, isLoading] = useSearchUserMutation();
  const [isSetting, setIsSettings] = useState<boolean>(false);
  const chats = useAppSelector((state) => state.chats.chats);
  const { data: session } = useSession();

  const socketInitializer = async () => {
    await fetch(`/api/socket`);
    const socket = io();
    socket.on('connect', () => {
      console.log('connected')
    })
    return null
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  useFetchChatsQuery(undefined);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);

  useEffect(() => {
    setResult(chats);
  }, [chats]);

  //   const handleSearch = async (chatName: string) => {
  //     const data = result.filter(
  //       (chats) =>{

  //         const name = getSender(session?.user, chats).split("");
  // const chat =
  //         const data = name.includes(chat)
  //         if(data){
  //           chats
  //         }
  //       }

  //     );

  //     console.log("Chat search", data);
  //     setResult(data);
  //   };

  // const handleSearch = debounce(
  //   (searchTerm: string) => getSearchUser(searchTerm),
  //   1000
  // );

  return (
    <>
      <div
        className={`  w-full md:w-[20rem] lg:w-[25rem] h-full ${
          selectedChat ? "hidden" : "flex"
        } p-5 dark:bg-slate-800 bg-white md:flex flex-col justify-between  items-center gap-6`}
      >
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-2xl font-medium dark:text-white">Chats</span>
            <Button
              variant="pink"
              size="base"
              onClick={() => setIsSettings(true)}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="dark:text-white"
              />
            </Button>
          </div>

          <div>
            <input
              type="text"
              id="small-input"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search or Start a new Chat"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <ChatList result={result} isLoading={isLoading} />
      </div>
      <CreateChatModal isOpen={isSetting} setIsOpen={() => setIsSettings()} />
    </>
  );
};

export default MidSection;
