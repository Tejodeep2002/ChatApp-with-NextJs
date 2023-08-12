"use client";
import { Button } from "@/components/ui/Button";
import { useAccessChatMutation } from "@/lib/redux/api/apiChatSlice";
import {
  SearchUser,
  useSearchUserMutation,
} from "@/lib/redux/api/apiUserSlice";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ChatList from "./ChatList";
import { setInterval } from "timers/promises";
import debounce from "lodash.debounce";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<SearchUser[]|undefined>();
  const [searchUser, isLoading] = useSearchUserMutation();

  const getSearchUser = async (user: string) => {
    try {
      const response = await searchUser({ user }).unwrap();
      console.log(response);
      setResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = debounce(
    (searchTerm: string) => getSearchUser(searchTerm),
    4000
  );

  return (
    <>
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-2xl font-medium">Chats</span>
          <Button>
            <FontAwesomeIcon icon={faPenToSquare} />
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
      <ChatList result={result} />
    </>
  );
};

export default Header;
