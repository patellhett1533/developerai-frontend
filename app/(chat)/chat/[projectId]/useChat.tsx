"use client";
import { get_api } from "@/helper/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ChatBox {
  content: string;
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
  initialMessage: string;
  setInitialMessage: (msg: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatBox[]>([]);
  const [initialMessage, setInitialMessage] = useState('');
  const [latestGeneratedAnswer, setLatestGeneratedAnswer] =
    useState<string>("");

  const fetchAllMessages = async () => {
    const { data } = await get_api(`/message/${pathname.split("/")[3]}`);
    if (data) {
      setMessages(data);
    }
  };

  useEffect(() => {
    console.log(initialMessage);
    if(pathname.split("/")[3]) {
    fetchAllMessages();
    }
  }, []);

  const askQuestion = async (question: string) => {
    try {
      const newRoomId = crypto.randomUUID()
      if(!pathname.split("/")[3]){
        setInitialMessage(question);
        router.replace(`/chat/${pathname.split("/")[2]}/${newRoomId}`)
      }
      setLatestGeneratedAnswer("");
        setMessages((prev) => [
        ...prev,
        {
          content: question, 
          role: "user",
          timestamp: Date.now(),
          id: newRoomId,
        },
      ]);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: question, projectId: pathname.split("/")[2], roomId: pathname.split("/")[3] ?? newRoomId }),
        credentials: "include",
      });

      if(!response.ok || !response.body) {
        console.error("Error in askQuestion:", response);
        return;
      }

      // if(pathname.split("/")[3]){
      // setMessages((prev) => [
      //   ...prev,
      //   {
      //     content: data.content,
      //     role: "assistant",
      //     timestamp: Date.now(),
      //     id: crypto.randomUUID(),
      //   },
      // ])
      // }
      // else{
      //   router.push(`/chat/${pathname.split("/")[2]}/${data.room_id}`);
      // }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const randomId = crypto.randomUUID();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        if (messages.find((msg) => msg.id === randomId)) {
          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id === randomId) {
                return {
                  ...msg,
                  content: msg.content + chunk,
                };
              }
              return msg;
            })
          );
        } else {
          setMessages((prev) => [
            ...prev,
            {
              content: chunk,
              role: "assistant",
              timestamp: Date.now(),
              id: randomId,
            },
          ]);
        }
      }
      
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
        initialMessage, setInitialMessage
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
