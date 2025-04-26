"use client";
import ChatInput from "@/app/_components/(chat)/ChatInput";
import React, { useRef, useEffect, useState } from "react";
import UserChatBox from "./UserChatBox";
import SystemChatBox from "./SystemChatBox";
import { useChatContext } from "../useChat";
import { ArrowDown } from "lucide-react";

const Page = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { messages, latestGeneratedAnswer } = useChatContext();
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    const container = messagesContainerRef.current;

    const handleScroll = () => {
      if (!container) return;

      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 50;

      setIsAutoScroll(isAtBottom);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoScroll && messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, latestGeneratedAnswer, isAutoScroll]);


  return (
    <div className="w-full h-full flex flex-col relative">
      <div
        className="flex-1 overflow-y-auto w-full minimal-scrollbar"
      >
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl px-4">
            {messages?.length > 0 ? (
              messages.map((message, index) => {
                return message.role === "user" ? (
                  <UserChatBox key={index} question={message.content} />
                ) : (
                  <SystemChatBox
                    key={index}
                    message={message.content}
                    // latestGeneratedAnswer={latestGeneratedAnswer}
                  />
                );
              })
            ) : (
              <></>
            )}
            {latestGeneratedAnswer && (
              <SystemChatBox
                key={crypto.randomUUID()}
                message={latestGeneratedAnswer}
              />
            )}

            <div ref={messagesContainerRef} />

          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-full pt-2 pb-4">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
