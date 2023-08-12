"use client";
import React, { useState } from "react";
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

const MidSection = () => {
  const [result, setResult] = useState<SearchUser[]>([]);
  const [searchUser, isLoading] = useSearchUserMutation();

  const { data } = useFetchChatsQuery(undefined);

  const getSearchUser = async (user: string) => {
    if (user.length !== 0) {
      try {
        const response = await searchUser({ user }).unwrap();
        setResult(response);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      setResult([])
    }
  };

  const handleSearch = debounce(
    (searchTerm: string) => getSearchUser(searchTerm),
    1000
  );

  return (
    <div className="w-[31%] h-full p-5 bg-white  flex flex-col justify-between  items-center gap-6">
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
      {/* <Header /> */}
      <ChatList result={result} isLoading={isLoading} />
    </div>
  );
};

export default MidSection;
