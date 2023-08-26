"use client";
import React, { useEffect, useState } from "react";
import TextBar from "./TextBar";
import ChatHeader from "./ChatHeader";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import { useFetchAllMessagesMutation } from "@/lib/redux/api/apiMessage";
import { toast } from "react-toastify";

import { addNewMessage, updateMessage } from "@/lib/redux/Slices/messageSlice";

var socket: any;
const serverURL = process.env.NEXT_PUBLIC_API_URL!;
const ChatArea = () => {
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const messages = useAppSelector((state) => state.message.message);
  const chats = useAppSelector((state) => state.chats.chats);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [fetchAllMessages, { isLoading }] = useFetchAllMessagesMutation();

  useEffect(() => {
    socket = io(serverURL);
  }, []);

  useEffect(() => {
    if (user.id.length !== 0) {
      socket.emit("setup", user);
      socket.on("connection", () => setSocketConnected(true));
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const responce = await fetchAllMessages({
        chatId: selectedChat?.id,
      }).unwrap();
      socket.emit("join chat", selectedChat.id);
    } catch (error) {
      console.log(error);
      toast.error("Error occuere");
    }
  };

  useEffect(() => {
    if (user.id.length !== 0) {
      console.log("Message Recieved Reload");
      socket.on("message received", (newMessageReceived: Message) => {
        console.log("Message Recieved");
        if (!selectedChat || selectedChat.id !== newMessageReceived.chat.id) {
          //give notification
        } else {
          dispatch(updateMessage([newMessageReceived, ...messages]));
        }
      });
    }
  }, [messages]);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <div
      className={` w-full  ${selectedChat ? "flex" : "hidden"} md:flex h-full`}
    >
      {selectedChat ? (
        <div className="w-full h-full flex flex-col justify-between">
          <ChatHeader />
          {isLoading ? <h1>Loading</h1> : <ScrollableChat />}

          <TextBar socket={socket} />
        </div>
      ) : (
        <div>No chat selected</div>
      )}
    </div>
  );
};

export default ChatArea;
