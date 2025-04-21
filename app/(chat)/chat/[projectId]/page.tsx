"use client";
import ChatInput from "@/app/_components/(chat)/ChatInput";
import React from "react";
import { useChatContext } from "./useChat";

const Page = () => {
  const { messages, latestGeneratedAnswer } = useChatContext();
  return (
    <div className="h-full flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <div className="w-full text-center text-4xl mb-8 font-bold">
        What do you want ?
      </div>
      <ChatInput />
    </div>
  );
};

export default Page;
