import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "./redux/hooks";


export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getSender = (logedInUser:User, chats: Chat) => {
  if (chats.isGroupChat) {
    return chats.chatName;
  } else {
    return chats.users[1].id === logedInUser.id
      ? chats.users[0].name
      : chats.users[1].name;
  }
};

export const getImage = (logedInUser:User, chats: Chat) => {
  if (chats.isGroupChat) {
    return chats.chatName;
  } else {
    return chats.users[1].id === logedInUser.id
      ? chats.users[0].image
      : chats.users[1].image;
  }
};


export const toPusherKey=(key:string)=>{
  return key.replace(/:/g, '__')

}
