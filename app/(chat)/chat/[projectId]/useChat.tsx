"use client";
import { get_api, post_api } from "@/helper/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ChatBox {
  content: {
    [key: string]: any;
  };
  role: "user" | "assistant";
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
  const pathname = usePathname();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatBox[]>([]);
  const [latestGeneratedAnswer, setLatestGeneratedAnswer] =
    useState<string>("");

  const fetchAllMessages = async () => {
    const { data } = await get_api(`/message/${pathname.split("/")[3]}`);
    if (data) {
      setMessages(data);
    }
  };

  useEffect(() => {
    if(pathname.split("/")[3]) {
    fetchAllMessages();
    }
  }, [pathname]);

  const askQuestion = async (question: string) => {
    try {
      setLatestGeneratedAnswer("");
      if(pathname.split("/")[3]){setMessages((prev) => [
        ...prev,
        {
          content: {question},
          role: "user",
          timestamp: Date.now(),
          id: crypto.randomUUID(),
        },
      ]);}
      const {data, message} = await post_api(`/message`, { prompt: question, projectId: pathname.split("/")[2], roomId: pathname.split("/")[3] });
      if(pathname.split("/")[3]){
      setMessages((prev) => [
        ...prev,
        {
          content: data.content,
          role: "assistant",
          timestamp: Date.now(),
          id: crypto.randomUUID(),
        },
      ])
      }
      else{
        router.push(`/chat/${pathname.split("/")[2]}/${data.room_id}`);
      }
      // const reader = res.body.getReader();
      // const decoder = new TextDecoder();
      // const randomId = crypto.randomUUID();

      // while (true) {
      //   const { done, value } = await reader.read();

      //   if (done) break;

      //   const chunk = decoder.decode(value);
      //   if (messages.find((msg) => msg.id === randomId)) {
      //     setMessages((prev) =>
      //       prev.map((msg) => {
      //         if (msg.id === randomId) {
      //           return {
      //             ...msg,
      //             message: msg.message + chunk,
      //           };
      //         }
      //         return msg;
      //       })
      //     );
      //   } else {
      //     setMessages((prev) => [
      //       ...prev,
      //       {
      //         message: chunk,
      //         sender: "system",
      //         timestamp: Date.now(),
      //         id: randomId,
      //       },
      //     ]);
      //   }
      // }
      // router.push(`/chat/${pathname.split("/")[2]}`);
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
