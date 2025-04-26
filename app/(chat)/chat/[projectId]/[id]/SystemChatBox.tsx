"use client";

import React, { useEffect } from "react";
import RenderCode from "@/app/_components/(chat)/RenderCode";
import * as marked from "marked";

const parseMessageToComponents = (message: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  let match;
  while ((match = codeBlockRegex.exec(message)) !== null) {
    const [fullMatch, language, codeContent] = match;
    const matchStart = match.index;

    // Add text before this code block
    if (matchStart > lastIndex) {
      const textBefore = message.slice(lastIndex, matchStart).trim();
      if (textBefore) {
        elements.push(
          <div key={`text-${matchStart}`} className="mb-4 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: marked.parse(textBefore) }}>
          </div>
        );
      }
    }

    // Push the RenderCode component
    elements.push(
      RenderCode(codeContent.trim(), language || "plaintext", matchStart)
    );

    lastIndex = match.index + fullMatch.length;
  }

  // Add remaining text after last code block
  if (lastIndex < message.length) {
    const remaining = message.slice(lastIndex).trim();
    if (remaining) {
      elements.push(
        <div key="text-end" className="mb-4 whitespace-pre-wrap [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4" dangerouslySetInnerHTML={{ __html: marked.parse(remaining) }}>
        </div>
      );
    }
  }

  return elements;
};


const SystemChatBox = ({ message }: { message: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const parsed = parseMessageToComponents(message);

  return <div className="mt-8">{parsed}</div>;
};

export default SystemChatBox;
