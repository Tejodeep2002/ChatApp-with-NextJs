import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getSender = () => {};

export const getImage = (logedInUser, chats: Chats) => {
  if (chats.isGroupChat) {
    return chats.groupImage;
  } else {
    return chats.users[1].id === logedInUser.id
      ? chats.users[0].pic
      : chats.users[1].pic;
  }

  return;
};
