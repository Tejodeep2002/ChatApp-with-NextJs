"use client";
import React, { useEffect } from "react";
import SideBar from "./SideBar/SideBar";
import MidSection from "./MidSection/MidSection";
import ChatArea from "./ChatArea/ChatArea";


const Home = () => {
  // useEffect(() => {
  //   const cookieValue = Cookies.get("token");
  //   console.log(cookieValue);
  // }, []);

  return (
    <div className="w-full h-screen flex dark">
      <SideBar />
      <MidSection />
      <ChatArea />
    </div>
  );
};

export default Home;
