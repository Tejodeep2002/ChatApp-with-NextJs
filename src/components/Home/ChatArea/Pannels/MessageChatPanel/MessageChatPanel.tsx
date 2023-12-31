"use client";
import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ScrollableChat from "./ScrollableChat";
import TextBar from "./TextBar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useFetchAllMessagesMutation } from "@/lib/redux/api/apiMessage";
import { updateMessage } from "@/lib/redux/Slices/messageSlice";
import { toast } from "react-toastify";

const MessageChatPanel = ({ socket }: { socket: any }) => {
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const messages = useAppSelector((state) => state.message.message);
  const chats = useAppSelector((state) => state.chats.chats);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [fetchAllMessages, { isLoading }] = useFetchAllMessagesMutation();

  useEffect(() => {
    if (user.id.length !== 0) {
      // socket.emit("setup", user);
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
    <>
      <ChatHeader />
      {isLoading ? <h1>Loading</h1> : <ScrollableChat />}
      <TextBar socket={socket} />
    </>
  );
};

export default MessageChatPanel;
