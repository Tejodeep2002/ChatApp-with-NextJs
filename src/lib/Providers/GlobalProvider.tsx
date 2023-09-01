"use client";
import React, { FC, ReactHTML, ReactNode } from "react";
import { ReduxProvider } from "../redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import PeerProvider from "./Peer";
import SocketProvider from "./Socket";


interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return (
    <div>
      <PeerProvider>
        <SocketProvider>
          <ReduxProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </ReduxProvider>
        </SocketProvider>
      </PeerProvider>
    </div>
  );
};

export default GlobalProvider;
