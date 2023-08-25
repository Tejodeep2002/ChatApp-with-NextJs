import { useLazyFetchAllMessagesQuery } from "@/lib/redux/api/apiMessage";
import { useAppSelector } from "@/lib/redux/hooks";

import React, { FC, useEffect, useState } from "react";

interface ScrollableChatProps {
  selectedChat: Chat;
}

const ScrollableChat: FC<ScrollableChatProps> = ({ selectedChat }) => {
  // const { data: session, status } = useSession();
  const [messageArray, setMessageArray] = useState<Message[]>([]);
  const user = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState();
  const [reload, setReload] = useState(false);

  const [trigger, result, lastPromiseInfo] = useLazyFetchAllMessagesQuery();
  const messageList = useAppSelector((state) => state.message.message);
  useEffect(() => {
    setMessageArray(messageList);
  }, [messageList]);

  useEffect(() => {
    trigger({
      chatId: selectedChat?.id,
    });
  }, []);

  console.log(messageList);

  return (
    <div className="w-full h-[87%] flex flex-col-reverse pb-5 px-11  gap-0  overflow-auto">
      {messageArray.length !== 0
        ? messageArray.map((message) => (
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
