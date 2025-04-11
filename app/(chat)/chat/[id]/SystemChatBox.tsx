import React from "react";
import { marked } from "marked";

const SystemChatBox = ({ message }: { message: string }) => {
  const html = marked.parse(message);
  return (
    <div
      className="[&_h2]:text-lg [&_h2]:text-base-800 [&_h2]:font-medium [&_h2]:mt-4 [&_ul]:list-disc [&_ul]:ml-8 flex flex-col gap-2 text-base-650 [&_pre]:bg-base-200 [&_pre]:px-2 [&_pre]:py-0.5 [&_pre]:rounded [&_pre]:text-sm [&_pre]:text-base-800 [&_pre]:whitespace-pre-wrap [&_pre]:overflow-x-auto [&_pre]:max-h-96 [&_pre]:overflow-y-auto [&_code]:bg-base-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-base-800"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default SystemChatBox;
