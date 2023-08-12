"use client";
import { useUserInfoQuery } from "@/lib/redux/api/apiUserSlice";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faGear, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useState } from "react";

import { Button, CircularButton } from "@/components/ui/Button";
import SettingsModal from "../ui/SettingsModal";

interface User {
  id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
}

const SideBar: FC = () => {
  const [isSetting, setIsSettings] = useState<boolean>(false);
  const { data, isLoading } = useUserInfoQuery(undefined);

  console.log(data);

  return (
    <>
      <div className="w-12 h-screen bg-slate-300  flex justify-between p-5 flex flex-col items-center">
        <div className="flex flex-col gap-5 items-center">
          <Button variant="small">
            <FontAwesomeIcon
              icon={faComment}
              style={{ color: "", width: "24px", height: "24px" }}
            />
          </Button>

          <Button variant="small">
            <FontAwesomeIcon
              icon={faPhone}
              style={{ color: "", width: "24px", height: "24px" }}
            />
          </Button>
        </div>
        <div className=" flex flex-col gap-7 items-center">
          <Button variant="small" onClick={() => setIsSettings(true)}>
            <FontAwesomeIcon
              icon={faGear}
              style={{ color: "", width: "24px", height: "24px" }}
            />
          </Button>
          <Button variant="small">
            <img
              src={data?.pic}
              className="w-7 h-7 bg-white border border-black border-2 rounded-full"
              srcSet=""
            />
          </Button>
        </div>
      </div>
      <SettingsModal isOpen={isSetting} setIsOpen={() => setIsSettings()} />
    </>
  );
};
export default SideBar;
