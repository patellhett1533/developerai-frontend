"use client";
import { createContext, useContext, useState } from "react";

interface ChatContext {}

const ChatContext = createContext<ChatContext | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChatContext.Provider>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
