"use client";
import React, { FC, ReactNode } from "react";
import { Button } from "../../ui/Button";
import { signOut } from "next-auth/react";

export interface SettingsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, setIsOpen }) => {
  const Signout = () => {
    signOut();
  };

  return (
    <div
      className={`fixed bottom-0 left-2 w-full h-1/2 max-w-md max-h-full shadow-lg overflow-y-auto transform ${
        isOpen ? "  translate-y-0" : " translate-y-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* <!-- Modal content --> */}
      <div className="relative w-full h-full rounded-lg shadow border  dark:bg-gray-700 ">
        {/* <!-- Modal header --> */}
        <div className="flex w-full h-12 items-center justify-between p-5 border-b rounded-t bg-white dark:border-gray-600">
          <h3 className="text-xl font-medium  text-gray-900 dark:text-white">
            Settings
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="small-modal"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className=" flex w-full h-[88%]  border ">
          <div className="w-[35%]  px-3 py-2  text-white bg-slate-600 flex flex-col ">
            <Button variant="transperant">Profile</Button>
            <Button variant="transperant">General</Button>
            <Button variant="transperant">personalization</Button>
           
          </div>
          <div className="w-full  px-6 bg-white border ">
            <Button variant="primary" size="default" onClick={Signout}>
              Log Out
            </Button>
          </div>
        </div>

        {/* <!-- Modal footer --> */}
      </div>
    </div>
  );
};

export default SettingsModal;
