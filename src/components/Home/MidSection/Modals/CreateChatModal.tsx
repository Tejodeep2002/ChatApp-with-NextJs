"use client";
import React, { FC, useState } from "react";
import CreateGroup from "./CreateGroup";
import AddUser from "./AddUser";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openCreateChatModal } from "@/lib/redux/Slices/uiSlice";

const CreateChatModal: FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const isOpenCreateChatModal = useAppSelector(
    (state) => state.ui.createChatModal
  );
  const dispatch = useAppDispatch();

  return (
    <div
      className={`fixed ${
        selectedChat ? "hidden" : "flex"
      } w-full h-full  transform ${
        isOpenCreateChatModal ? "  -translate-y-0" : " -translate-y-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="w-full h-full  "
        onClick={() => dispatch(openCreateChatModal(false))}
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
            {toggle ? <AddUser /> : <CreateGroup />}
          </div>
          {/* <!-- Modal footer --> */}
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;
