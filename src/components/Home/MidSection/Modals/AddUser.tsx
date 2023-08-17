"use client";
import { useAccessChatMutation } from "@/lib/redux/api/apiChatSlice";
import {
  SearchUser,
  useSearchUserMutation,
} from "@/lib/redux/api/apiUserSlice";
import debounce from "lodash.debounce";
import React, { FC, useState } from "react";
import UserListItems from "../UserListItems";

export interface AddUserProps {
  isModalOpen: boolean;
}

const AddUser: FC<AddUserProps> = ({ isModalOpen }) => {
  const [searchResult, setSeachResult] = useState<SearchUser[]>();
  const [accessChat] = useAccessChatMutation();
  const [searchUser, isLoading] = useSearchUserMutation();

  const getSearchUser = async (user: string) => {
    if (user.length !== 0) {
      try {
        const response = await searchUser({ user }).unwrap();
        setSeachResult(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSeachResult([]);
    }
  };

  const handleSearch = debounce(
    (searchTerm: string) => getSearchUser(searchTerm),
    1000
  );

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
                image={item.pic}
                name={item.name}
                key={item.id}
                onClick={() => accessChat({ userId: item.id })}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default AddUser;
