import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getSender = (logedInUser, chats: Chat) => {
  if (chats.isGroupChat) {
    return chats.chatName;
  } else {
    return chats.users[1].id === logedInUser.id
      ? chats.users[0].name
      : chats.users[1].name;
  }
};

export const getImage = (logedInUser, chats: Chat) => {
  if (chats.isGroupChat) {
    return chats.chatName;
  } else {
    return chats.users[1].id === logedInUser.id
      ? chats.users[0].pic
      : chats.users[1].pic;
  }
};


