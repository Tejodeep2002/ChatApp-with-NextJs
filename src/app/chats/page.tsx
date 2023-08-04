
import MainSection from "@/components/Chats/MainSection";
import SideBar from "@/components/Chats/SideBar";
import { cookies } from "next/headers";
import React, { useState } from "react";

const page = () => {
  const cookieStore = cookies();

  return (
    <div className="w-full h-screen">
      <div className="flex ">
        <SideBar />
        <MainSection cookies={cookieStore.get('token')}/>
      </div>
    </div>
  );
};

export default page;
