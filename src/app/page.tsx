import SideBar from "@/components/Chats/SideBar";
import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Modals from "@/components/ui/SettingsModal";
import MidSection from "@/components/Chats/MidSection/MidSection";
import ChatArea from "@/components/Chats/ChatArea";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  console.log("Chat", session.user);

  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <MidSection />
      <ChatArea />
    </div>
  );
};

export default page;
