"use client";
import React, { FC, ReactHTML, ReactNode } from "react";
import { ReduxProvider } from "../redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return (
    <div>
      <SessionProvider>
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
      </SessionProvider>
    </div>
  );
};

export default GlobalProvider;
