// import { useLazyFetchAllMessagesQuery } from "@/lib/redux/api/apiMessage";
import { useAppSelector } from "@/lib/redux/hooks";

import React, { FC } from "react";

interface ScrollableChatProps {}

const ScrollableChat: FC<ScrollableChatProps> = () => {
  const user = useAppSelector((state) => state.user);
  const messages = useAppSelector((state) => state.message.message);
  return (
    <div className="w-full h-[87%] flex flex-col-reverse pb-5 px-11  gap-0  overflow-auto">
      {messages.length !== 0
        ? messages.map((message) => (
            <div
              className={`w-full mt-4 flex ${
                user.id === message.sender.id ? "justify-end" : "justify-start"
              }`}
              key={message.id}
            >
              <span
                className={`w-auto bg-white p-2 rounded-lg text-sm flex item-center justify-center `}
              >
                {message.content}
              </span>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ScrollableChat;
