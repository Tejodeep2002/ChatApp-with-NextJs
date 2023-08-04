"use client";
import React, { useEffect } from "react";
import MidSection from "./Mid Section/MidSection";
import ChatArea from "./ChatArea";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addUser } from "@/lib/redux/Slices/user/userSlice";

const MainSection: React.FC<any> = ({ cookies }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const store = useAppSelector((store) => store.user);

  useEffect(() => {
    if (cookies !== undefined) {
      // dispatch(addUser(JSON.parse(cookies.value)));
      // console.log(store);
    } else {
      router.push("/");
      router.refresh();
    }
  }, [router]);

  console.log(store);
  return (
    <div className="w-full h-screen border border-red-500 flex justify-between  flex  items-center">
      <MidSection />
      <ChatArea />
    </div>
  );
};

export default MainSection;
