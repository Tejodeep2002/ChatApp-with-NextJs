"use client";
import { useUserInfoQuery } from "@/lib/redux/api/apiUserSlice";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faGear, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";

import { Button } from "@/components/ui/Button";
import SettingsModal from "./SettingsModal";
import Image from "next/image";

const SideBar: FC = () => {
  const [isSetting, setIsSettings] = useState<boolean>(false);
  const { data } = useUserInfoQuery(undefined);

  return (
    <>
      <div className="w-12 h-screen bg-slate-300  justify-between p-5 flex flex-col items-center dark:bg-slate-700">
        <div className="flex flex-col gap-5 items-center">
          <Button variant="pink" size='sm'>
            <FontAwesomeIcon
              icon={faComment}
              style={{ color: "", width: "24px", height: "24px" }}
              className="dark:text-white"
            />
          </Button>

          <Button variant="pink" size='sm'>
            <FontAwesomeIcon
              icon={faPhone}
              style={{ color: "", width: "24px", height: "24px" }}
              className="dark:text-white"
            />
          </Button>
        </div>
        <div className=" flex flex-col gap-7 items-center">
          <Button variant="pink" size='sm' onClick={() => setIsSettings(true)}>
            <FontAwesomeIcon
              icon={faGear}
              style={{ width: "24px", height: "24px" }}
              className="dark:text-white"
            />
          </Button>
          <Button variant="pink" size='sm'>
            <img
              src={data?.pic}
              width={7}
              height={7}
              alt={"profile"}
              className="w-7 h-7 bg-white dark:border-white border-black border-2 rounded-full"
            />
          </Button>
        </div>
      </div>
      <SettingsModal isOpen={isSetting} setIsOpen={() => setIsSettings()} />
    </>
  );
};
export default SideBar;
