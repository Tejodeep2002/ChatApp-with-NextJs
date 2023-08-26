"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useFetchChatsQuery } from "@/lib/redux/api/apiChatSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import CreateChatModal from "./Modals/CreateChatModal";
import { getImage, getSender } from "@/lib/utils";
import { openCreateChatModal } from "@/lib/redux/Slices/uiSlice";
import Chats from "./Chats";
import { updateSelectedChat } from "@/lib/redux/Slices/chatSlice";
import { useUserInfoQuery } from "@/lib/redux/api/apiUserSlice";

const MidSection: FC<any> = ({ session }) => {
  const [result, setResult] = useState<Chat[]>([]);
  const chats = useAppSelector((state) => state.chats.chats);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useFetchChatsQuery(undefined);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);

  useEffect(() => {
    setResult(chats);
  }, [chats]);

  const handleSearch = (chatName: string) => {
    if (chatName !== "") {
      const lowercase = chatName.toLowerCase();
      const newChatArray = result.filter((chats) =>
        getSender(user, chats).toLowerCase().includes(lowercase)
      );
      setResult(newChatArray);
    } else {
      setResult(chats);
    }
  };

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
              onClick={() => dispatch(openCreateChatModal(true))}
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
        <div className="w-full h-full border border-green-500 overflow-y-scroll scroll-smooth">
          {result.map((item) => (
            <Chats
              id={item.id}
              image={getImage(user, item)}
              name={getSender(user, item)}
              latestMessage={item.latestMessage?.content}
              key={item.id}
              onAccess={() => dispatch(updateSelectedChat(item))}
            />
          ))}
        </div>
      </div>
      <CreateChatModal />
    </>
  );
};

export default MidSection;
