"use client";
import { useAccessChatMutation } from "@/lib/redux/api/apiChatSlice";
import {
  SearchUser,
  useSearchUserMutation,
} from "@/lib/redux/api/apiUserSlice";
import debounce from "lodash.debounce";
import React, { FC, useState, useEffect } from "react";
import UserListItems from "../UserListItems";
import { openCreateChatModal } from "@/lib/redux/Slices/uiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

const AddUser: FC = () => {
  const [searchResult, setSearchResult] = useState<SearchUser[]>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [accessChat] = useAccessChatMutation();
  const [searchUser, isLoading] = useSearchUserMutation();
  // const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const getSearchUser = async (user: string) => {
    if (user.length !== 0) {
      try {
        const response = await searchUser({ user }).unwrap();
        console.log(response);
        setSearchResult(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearch = debounce(
    (searchTerm: string) => getSearchUser(searchTerm),
    800
  );

  const handleAccessChat = (id: string) => {
    accessChat({ userId: id });
    handleSearch("");
    dispatch(openCreateChatModal(false));
  };

  return (
    <div>
      <input
        type="text"
        className="w-full h-10 rounded text-sm"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="search new user with userid or email"
      />
      <div className="w-full bg-white  border border-red-600">
        {searchResult
          ? searchResult.map((item) => (
              <UserListItems
                id={item.id}
                image={item.image}
                name={item.name}
                key={item.id}
                onClick={() => handleAccessChat(item.id)}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default AddUser;
