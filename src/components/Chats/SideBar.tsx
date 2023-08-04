"use client";

import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faGear, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


interface User {
  id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
}

const SideBar: React.FC<any> = ({ cookies }) => {
  

  return (
    <>
      <div className="w-12 h-screen border border-black flex justify-between p-5 flex flex-col items-center">
        <div className="flex flex-col gap-3 items-center">
          <FontAwesomeIcon
            icon={faComment}
            style={{ color: "", width: "24px", height: "24px" }}
          />
          <FontAwesomeIcon
            icon={faPhone}
            style={{ color: "", width: "24px", height: "24px" }}
          />
        </div>
        <div className=" flex flex-col gap-7 items-center">
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "", width: "24px", height: "24px" }}
          />
          <div className="w-7 h-7 bg-white rounded-full"></div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
