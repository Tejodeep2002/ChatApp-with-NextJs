import React, { useCallback, useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faMicrophone,
  faPhoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { usePeer } from "@/lib/Providers/Peer";
import { openVideoCallPanel } from "@/lib/redux/Slices/uiSlice";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/Button";

const VideoCallPanel = ({ socket }: { socket: any }) => {
  const [inputToggle, setInputToggle] = useState({ video: true, audio: false });
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [myStream, setMyStream] = useState<MediaStream>();

  const {
    peer,
    createAnswer,
    setRemoteAnswer,
    sendStream,
    remoteStream,
    remoteId,
    setRemoteId,
  } = usePeer();

  console.log("Remote ", remoteId);

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    setMyStream(stream);
  }, []);

  const handleCallAccepted = useCallback(
    async (data: any) => {
      const { answer } = data;

      console.log("call Accepted", answer);
      await setRemoteAnswer(answer);
      // sendStream(myStream);
    },
    [setRemoteAnswer]
  );

  const handleCallRejected = useCallback(async () => {
    dispatch(openVideoCallPanel(false));
    console.log("call rejected");
  }, [dispatch]);

  useEffect(() => {
    socket.on("call-Rejected", handleCallRejected);
    socket.on("call-Accepted", handleCallAccepted);
    return () => {
      socket.off("call-Rejected", handleCallRejected);
      socket.off("call-Accepted", handleCallAccepted);
    };
  }, [handleCallAccepted, handleCallRejected, socket]);

  const handleNegotiation = useCallback(async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    console.log("Negotation needed");
    console.log("Remote Id", remoteId);

    socket.emit("negotiation-init", {
      callTo: remoteId,
      callFrom: user,
      offer,
    });
  }, [peer, remoteId, socket, user]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegotiation);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiation);
    };
  }, [handleNegotiation, peer]);

  const handleNegotiationGet = useCallback(
    async (data: any) => {
      const { callFrom, offer } = data;
      const answer = await createAnswer(offer);
      socket.emit("negotiation-accepted", { callFrom, answer });
    },
    [createAnswer, socket]
  );

  const handleNegotiationAccepted = useCallback(async (data: any) => {
    const { answer } = data;

    console.log("call Accepted", answer);
    await setRemoteAnswer(answer);
    // sendStream(myStream);
  }, [ setRemoteAnswer]);

  useEffect(() => {
    socket.on("negotiation-get", handleNegotiationGet);
    socket.on("negotiation-accepted", handleNegotiationAccepted);
    return () => {
      socket.off("negotiation-get", handleNegotiationGet);
      socket.off("negotiation-accepted", handleNegotiationAccepted);
    };
  }, [ handleNegotiationAccepted, handleNegotiationGet, socket]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  

  return (
    <>
      <div className="w-full h-full flex bg-black">
        <ReactPlayer
          url={myStream}
          playing
          muted
          width={"160px"}
          height={"160px"}
          className="absolute w-40 h-40 right-[3rem] bottom-[8rem] border rounded-lg"
        />

        <div className="w-full h-full">
          <ReactPlayer url={remoteStream} height={"93%"} playing />
          <div className="w-full h-[7%] bottom-0 bg-white dark:bg-slate-700 flex justify-center items-center">
            <div className="flex gap-4">
              <Button className="rounded-full w-10 h-10 bg-blue-500">
                <FontAwesomeIcon icon={faCamera} />
              </Button>
              <Button className="rounded-full w-10 h-10 bg-blue-500">
                <FontAwesomeIcon icon={faMicrophone} />
              </Button>
              <Button className="rounded-full w-10 h-10 bg-rose-600">
                <FontAwesomeIcon icon={faPhoneSlash} />
              </Button>
              <Button
                className="rounded-full w-10 h-10 bg-rose-600"
                onClick={(e) => sendStream(myStream)}
              >
                Send my video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCallPanel;
