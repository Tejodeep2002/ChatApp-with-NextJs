"use client";
import { useAccessChatMutation } from "@/lib/redux/api/apiChatSlice";
import {
  SearchUser,
  useSearchUserMutation,
} from "@/lib/redux/api/apiUserSlice";
import debounce from "lodash.debounce";
import React, { FC, useState, useEffect } from "react";
import UserListItems from "../UserListItems";
// import { pusherClient } from "@/lib/pusher";
import { useSession } from "next-auth/react";
import { toPusherKey } from "@/lib/utils";
import { openCreateChatModal } from "@/lib/redux/Slices/uiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

const AddUser: FC = () => {
  const [searchResult, setSearchResult] = useState<SearchUser[]>();
  const [accessChat] = useAccessChatMutation();
  const [searchUser, isLoading] = useSearchUserMutation();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const getSearchUser = async (user: string) => {
    try {
      const response = await searchUser({ user }).unwrap();
      setSearchResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  //socket
  // useEffect(() => {
  //   pusherClient.subscribe(
  //     toPusherKey(`user: ${session?.user.id}:incoming_friend_request`)
  //   );

  //   const friendRequestHandler = () => {
  //     console.log("new request");
  //   };

  //   pusherClient.bind("incoming_friend_request", friendRequestHandler);

  //   return () => {
  //     pusherClient.unsubscribe(
  //       toPusherKey(`user: ${session?.user.id}:incoming_friend_request`)
  //     );
  //     pusherClient.unbind("incoming_friend_request", friendRequestHandler);
  //   };
  // }, []);

  const handleSearch = debounce(
    (searchTerm: string) => getSearchUser(searchTerm),
    800
  );

  const handleAccessChat = (id: string) => {
    accessChat({ userId: id });
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
                image={item.pic}
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
