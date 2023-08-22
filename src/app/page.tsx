import React, { FC } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SideBar from "@/components/Home/SideBar/SideBar";
import MidSection from "@/components/Home/MidSection/MidSection";
import ChatArea from "@/components/Home/ChatArea/ChatArea";

const page:FC = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user.id) {
    redirect("/login");
  }
  
  return (
    <div className="w-full h-screen flex dark">
      <SideBar session={session} />
      <MidSection />
      <ChatArea />
    </div>
  );
};

export default page;
