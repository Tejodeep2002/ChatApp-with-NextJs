"use client";
import React, { useEffect } from "react";
import SideBar from "./SideBar/SideBar";
import MidSection from "./MidSection/MidSection";
import ChatArea from "./ChatArea/ChatArea";


const Home = () => {

  return (
    <div className="w-full h-screen flex dark">
      <SideBar />
      <MidSection />
      <ChatArea />
    </div>
  );
};

export default Home;
