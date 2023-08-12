"use client";
import React, { FC } from "react";
import Emoji from "./Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faLink, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/Button";



const TextBar: FC = () => {
  return (
    <div className="w-full h-12 p-2 bg-slate-300 flex items-center ">
      {/* <Emoji/> */}

      <Button variant="default">
        <FontAwesomeIcon icon={faFaceSmile} />
      </Button>

      <Button>
        <FontAwesomeIcon icon={faLink} />
      </Button>
      <input
        type="text"
        className="w-full h-7 mx-2 border:none"
        placeholder="Type a message"
      />

      <Button>
        <FontAwesomeIcon icon={faMicrophone} />
      </Button>
    </div>
  );
};

export default TextBar;
