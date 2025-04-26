'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ChatContextType = {
  initialMessage: string;
  setInitialMessage: (msg: string) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('ChatContext must be used within ChatProvider');
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [initialMessage, setInitialMessage] = useState('');

  return (
    <ChatContext.Provider value={{ initialMessage, setInitialMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
