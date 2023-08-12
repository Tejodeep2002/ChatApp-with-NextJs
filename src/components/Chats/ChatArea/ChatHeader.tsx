import { Button, CircularButton } from "@/components/ui/Button";
import {
  faMagnifyingGlass,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ChatHeader = () => {
  return (
    <div className="w-full h-14 px-6 py-4 bg-slate-300 flex items-center justify-between">
      <div className="  flex items-center gap-3">
        <CircularButton>
          <img
            src="https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg"
            alt=""
            className="w-10 h-full border border-black rounded-full"
          />
        </CircularButton>
        <span className="font-bold">name</span>
      </div>
      <div>
        <Button>
          <FontAwesomeIcon icon={faVideo} />
        </Button>
        <Button>
          <FontAwesomeIcon icon={faPhone} />
        </Button>
        <Button>
          <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
