"use client";

import React, { FC, useState } from "react";

import {
  SearchUser,
  useSearchUserMutation,
} from "@/lib/redux/api/apiUserSlice";
import debounce from "lodash.debounce";
import { useAccessChatMutation } from "@/lib/redux/api/apiChatSlice";
import CreateGroup from "./CreateGroup";
import AddUser from "./AddUser";
import { useAppSelector } from "@/lib/redux/hooks";

export interface SettingsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateChatModal: FC<SettingsModalProps> = ({ isOpen, setIsOpen }) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [result, setResult] = useState<SearchUser[]>([]);
  const [groupUsers, setGroupUsers] = useState<string[]>([]);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const [accessChat] = useAccessChatMutation();
  const [searchUser, isLoading] = useSearchUserMutation();
  const getSearchUser = async (user: string) => {
    if (user.length !== 0) {
      try {
        const response = await searchUser({ user }).unwrap();
        setResult(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      setResult([]);
    }
  };

  console.log(groupUsers);
  const handleSearch = debounce(
    (searchTerm: string) => getSearchUser(searchTerm),
    1000
  );

  return (
    <div
      className={`fixed ${
        selectedChat ? "hidden" : "flex"
      } w-full h-full  transform ${
        isOpen ? "  -translate-y-0" : " -translate-y-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="w-full h-full border "
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`absolute top-5 left-16 w-full max-h-56 max-w-xs  shadow-lg overflow-y-auto z-10`}
      >
        {/* <!-- Modal content --> */}
        <div className="relative w-full h-full rounded-lg shadow border  dark:bg-gray-700 ">
          {/* <!-- Modal header --> */}
          <div className="flex w-full h-12 items-center justify-between  border-b rounded-t bg-white dark:border-gray-600">
            {/* <h3 className="text-xl font-medium  text-gray-900 dark:text-white">
          Settings
        </h3> */}
            <div className="w-full h-full  flex cursor-pointer">
              <div
                className={`w-1/2 h-full border-r flex justify-center items-center text-sm ${
                  toggle ? "bg-red-700" : "bg-white"
                }
              `}
                onClick={() => setToggle(true)}
              >
                add New User
              </div>
              <div
                className={`w-1/2 h-full  flex justify-center items-center text-sm cursor-pointer ${
                  !toggle ? "bg-red-700" : "bg-white"
                }`}
                onClick={() => setToggle(false)}
              >
                create group chat
              </div>
            </div>
          </div>
          {/* <!-- Modal body --> */}
          <div className="  w-full   border flex flex-col p-3 bg-white">
            {toggle ? <AddUser isModalOpen={isOpen} /> : <CreateGroup />}
          </div>

          {/* <!-- Modal footer --> */}
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;
