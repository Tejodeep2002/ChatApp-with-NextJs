import Image from "next/image";
import React, { FC } from "react";

export interface UserListItemsProps {
  id: string;
  image: string;
  name: string;
  onClick: any;
}

const UserListItems: FC<UserListItemsProps> = ({
  id,
  image,
  name,
  onClick,
}) => {
  return (
    <div className="w-full h-10 flex items-center px-3 py-1 gap-4 bg-white border border-x-black cursor-pointer"
    onClick={onClick}>
      <img src={image} width={"30"} height={"30"} alt="Profile" className="rounded-full" />
      <div className="flex flex-col">
        <span className="text-sm font-bold">{name}</span>
        <span className="text-xs">dwadadwadadad</span>
      </div>
    </div>
  );
};

export default UserListItems;
