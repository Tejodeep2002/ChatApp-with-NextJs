import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <span className="text-2xl font-medium">Chats</span>
      {/* <div className="w-full h-7 px-2 flex items-center bg-white rounded-lg border-b-2 border-black">
        <input
          type="text"
          className="w-full h-full  "
          placeholder="Search or start a new chat  "
        /> 
        <div>
    
        <span className="w-6 h-6 border flex justify-center items-center ">
          <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} size="xs" />
        </span>
      </div>  */}

      <input
        type="text"
        id="small-input"
        placeholder="Search or Start a new Chat"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default Header;
