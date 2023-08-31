"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import MessageChatPanel from "./Pannels/MessageChatPanel/MessageChatPanel";
import VideoCallPanel from "./Pannels/VideoCallPanel/VideoCallPanel";
import { updateSelectedChat } from "@/lib/redux/Slices/chatSlice";
import { useSocket } from "@/lib/Providers/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { usePeer } from "@/lib/Providers/Peer";
import { openVideoCallPanel } from "@/lib/redux/Slices/uiSlice";

const serverURL = process.env.NEXT_PUBLIC_API_URL!;

const ChatArea = () => {
  const [callFrom, setCallFrom] = useState<string>("");
  const [offer, setOffer] = useState();
  const [incomingCall, setIncomingCall] = useState<boolean>();
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const user = useAppSelector((state) => state.user);
  const isOpenVideoCallPanel = useAppSelector(
    (state) => state.ui.videoCallPanel
  );
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const { createAnswer, setRemoteId } = usePeer();

  // User Join his own Room
  useEffect(() => {
    if (user.id.length !== 0) {
      socket.emit("setup", user);
    }
  }, [user, socket]);

  const handleIncomingCall = useCallback(
    (data: any) => {
      const { callFrom, selectedChatId, offer } = data;
      setIncomingCall(true);
      setCallFrom(callFrom);
      
      setOffer(offer);
      setSelectedChatId(selectedChatId);
      console.log("Incomming Call", { callFrom, selectedChatId, offer });
    },
    []
  );

  //Incomming Call
  useEffect(() => {
    socket.on("incoming-call", handleIncomingCall);

    return () => {
      socket.off("incoming-call", handleIncomingCall);
    };
  }, [handleIncomingCall, socket]);

  //Call Rejected
  const callRejected = () => {
    socket.emit("call-Rejected", callFrom);
    setIncomingCall(false);
  };

  //Call Accepted
  const callAccepted = async () => {
    const answer = await createAnswer(offer);

    socket.emit("call-Accepted", { callFrom, selectedChatId, answer });
    setRemoteId(callFrom);
    dispatch(openVideoCallPanel(true));
    setIncomingCall(false);
  };

  return (
    <div
      className={` w-full  ${selectedChat ? "flex" : "hidden"} md:flex h-full`}
    >
      {selectedChat ? (
        <div className="w-full h-full flex flex-col justify-between">
          {isOpenVideoCallPanel ? (
            <VideoCallPanel socket={socket} />
          ) : (
            <MessageChatPanel socket={socket} />
          )}
          <div
            className={` absolute right-0 top-16 ${
              incomingCall ? "flex" : "hidden"
            }  bg-white dark:bg-slate-600 w-64 h-24 border border-r-emerald-500 flex items-center justify-evenly`}
          >
            <img
              src={callFrom.image}
              alt=""
              srcSet=""
              className="w-12 h-12 border rounded-full "
            />

            <div className="flex flex-col">
              <span className="font-bold text-lg text-white">
                {callFrom.name}
              </span>

              <div className="flex gap-5">
                <button
                  className="rounded-full w-8 h-8 bg-green-600"
                  onClick={callAccepted}
                >
                  <FontAwesomeIcon icon={faPhone} />
                </button>

                <button
                  className="rounded-full w-8 h-8 bg-rose-600"
                  onClick={callRejected}
                >
                  <FontAwesomeIcon icon={faPhoneSlash} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No chat selected</div>
      )}
    </div>
  );
};

export default ChatArea;
