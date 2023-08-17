import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface UserBadgeItemProps {
  name: string;
  onRemove: any;
}

const UserBadgeItem: FC<UserBadgeItemProps> = ({ name, onRemove }) => {
  const userName = name.split(" ");
  return (
    <span className="w-fit p-1 rounded-xl border border-black text-xs font-bold flex gap-1   ">
      {userName[0]}
      <FontAwesomeIcon
        icon={faCircleXmark}
        size="lg"
        onClick={onRemove}
        className="cursor-pointer"
      />
    </span>
  );
};

export default UserBadgeItem;
