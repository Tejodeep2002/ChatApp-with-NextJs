"use client"
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Socket, io } from "socket.io-client";
const serverURL = process.env.NEXT_PUBLIC_API_URL!;

interface SocketContextState {
  socket: Socket;
}

const SocketContext = createContext<SocketContextState>(
  {} as SocketContextState
);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useMemo(() => io(serverURL), []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
