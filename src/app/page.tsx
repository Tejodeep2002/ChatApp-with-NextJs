import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SideBar from "@/components/Home/SideBar/SideBar";
import MidSection from "@/components/Home/MidSection/MidSection";
import ChatArea from "@/components/Home/ChatArea/ChatArea";

const page = async () => {
  const session = await getServerSession(authOptions);

 

  if (!session) {
    redirect("/login");
  }
  console.log("Chat", session.user);

  return (
    <div className="w-full h-screen flex dark">
      <SideBar />
      <MidSection />
      <ChatArea />
    </div>
  );
};

export default page;
