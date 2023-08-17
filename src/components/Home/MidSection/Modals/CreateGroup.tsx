import {
  SearchUser,
  useSearchUserMutation,
} from "@/lib/redux/api/apiUserSlice";
import debounce from "lodash.debounce";
import React, { useState } from "react";
import UserListItems from "../UserListItems";
import UserBadgeItem from "./UserBadgeItem";
import { useCreateGroupMutation } from "@/lib/redux/api/apiChatSlice";
import { Button } from "@/components/ui/Button";

const CreateGroup = () => {
  const [searchResult, setSeachResult] = useState<SearchUser[]>();
  const [searchUser, isLoading] = useSearchUserMutation();
  const [createGroup] = useCreateGroupMutation();
  const [selectedUser, setselectedUser] = useState<SearchUser[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [groupImage, setGroupImage] = useState<string>();

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
    900
  );

  const handleGroup = (id: SearchUser) => {
    setselectedUser([...selectedUser, id]);
  };

  const handleRemove = (id: string) => {
    setselectedUser(selectedUser.filter((user) => user.id !== id));
  };

  const handleSubmit = () => {
    try {
      const responce = createGroup({
        name,
        description,
        groupImage,
        users: selectedUser.map((user) => user.id),
      });
    } catch {}
  };

  return (
    <div className="w-full max-h-96 border border-black p-2 flex flex-col gap-2">
      <div className="flex gap-2 flex-col">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full border border-black"></div>
          <label htmlFor="">Add Group Image</label>
          <Button variant="primary" onClick={() => handleSubmit}>
            Create
          </Button>
        </div>
        <div className="flex flex-col text-xs">
          <label htmlFor="" className="font-bold">
            Group Name
          </label>
          <input
            type="text"
            className=" w-full h-6"
            onChange={(e) => setName(e.target.value)}
            placeholder="group name"
          />
        </div>
        <div className="flex flex-col text-xs">
          <label htmlFor="" className="font-bold">
            Group Description
          </label>
          <input
            type="text"
            className=" w-full h-6"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="group name"
          />
        </div>
        <input
          type="text"
          className="w-full h-8 rounded text-sm"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="search new user with userid or email"
        />
      </div>
      <div className="flex overflow-x-auto gap-2">
        {selectedUser
          ? selectedUser.map((user) => (
              <UserBadgeItem
                name={user.name}
                onRemove={() => handleRemove(user.id)}
                key={user.id}
              />
            ))
          : ""}
      </div>
      <div className="w-full bg-white  ">
        {searchResult
          ? searchResult.map((item) => (
              <UserListItems
                id={item.id}
                image={item.pic}
                name={item.name}
                key={item.id}
                onClick={() => handleGroup(item)}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default CreateGroup;
