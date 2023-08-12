"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Login from "../Login/Login";
import SignUp from "./SignUp";

const LoginOptions:React.FC = ():ReactElement => {
  const [option, setOption] = useState<Boolean>(true);
  return (
    <>
      <div className="w-full toggle">
        <div className="flex mb-[1em] text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <button
            className={`mr-2 w-[50%] h-full inline-block p-4 font-semibold ${
              option
                ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            } `}
            onClick={() => setOption(true)}
          >
            Login
          </button>
          <button
            className={`mr-2 w-[50%] h-full inline-block p-4 font-semibold ${
              !option
                ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
            onClick={() => setOption(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="w-full p-3">{option ? <Login /> : <SignUp />}</div>
      </div>
    </>
  );
};

export default LoginOptions;
