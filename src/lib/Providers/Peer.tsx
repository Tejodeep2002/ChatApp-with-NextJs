import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface PeerProviderProps {
  children: ReactNode;
}

interface PeerContextState {
  peer: RTCPeerConnection;
  createOffer: any;
  createAnswer: any;
  setRemoteAnswer: any;
  sendStream: any;
  remoteStream: any;
  remoteId: any;
  setRemoteId: any;
}

const PeerContext = createContext<PeerContextState>({} as PeerContextState);

export const usePeer = () => useContext(PeerContext);

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

const PeerProvider: FC<PeerProviderProps> = ({ children }) => {
  const [remoteStream, setRemoteStream] = useState();
  const [remoteId, setRemoteId] = useState();
  const [peer,setPeer] = useState< RTCPeerConnection>({} as  RTCPeerConnection)

  
  
  useEffect(()=>{
    const peer =  new RTCPeerConnection(servers);
    setPeer(peer)
  },[])

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer: any) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const sendStream = (stream: MediaStream) => {
    const tracks = stream.getTracks();
    console.log("tracks", tracks);
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };

  const setRemoteAnswer = async (answer: any) => {
    await peer.setRemoteDescription(answer);
  };

  const handleTrackEvent = useCallback((event: any) => {
    const streams = event.streams;
    setRemoteStream(streams[0]);
    console.log("STREAMS",streams)
  }, []);



  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, [handleTrackEvent, peer]);

  return (
    <PeerContext.Provider
      value={{
        peer,
        createOffer,
        createAnswer,
        setRemoteAnswer,
        sendStream,
        remoteStream,
        remoteId,
        setRemoteId,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;
