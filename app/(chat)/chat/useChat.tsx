"use client";
import { get_api } from "@/helper/api";
import { createContext, useContext, useState } from "react";

interface ChatBox {
  message: string;
  sender: "user" | "system";
  timestamp: number;
  id: string;
}

interface ChatContextType {
  messages: ChatBox[];
  latestGeneratedAnswer: string;
  askQuestion: (question: string) => Promise<void>;
  clearMessages: () => void;
  fetchAllMessages: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatBox[]>([]);
  const [latestGeneratedAnswer, setLatestGeneratedAnswer] =
    useState<string>("");

  const fetchAllMessages = async () => {
    const { data } = await get_api("/api/chat");
    if (data) {
      setMessages(data);
    }
  };

  const askQuestion = async (question: string) => {
    try {
      setMessages((prev) => [
        ...prev,
        {
          message: question,
          sender: "user",
          timestamp: Date.now(),
          id: crypto.randomUUID(),
        },
      ]);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.body) {
        console.error("No response body");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        setLatestGeneratedAnswer((prev) => prev + chunk);
      }

      const newMessage: ChatBox = {
        message: question,
        sender: "user",
        timestamp: Date.now(),
        id: crypto.randomUUID(),
      };
      setMessages((prev) => [...prev, newMessage]);
      const newResponse: ChatBox = {
        message: latestGeneratedAnswer,
        sender: "system",
        timestamp: Date.now(),
        id: crypto.randomUUID(),
      };
      setMessages((prev) => [...prev, newResponse]);
      setLatestGeneratedAnswer("");
    } catch (error) {
      console.log(error);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        latestGeneratedAnswer,
        askQuestion,
        clearMessages,
        fetchAllMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
