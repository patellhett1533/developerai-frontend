import React from "react";
import { marked } from "marked";

const SystemChatBox = ({ message }: { message: string }) => {
  const html = marked.parse(message);
  return (
    <div
      className="[&_h2]:text-lg [&_h2]:text-base-800 [&_h2]:font-medium [&_h2]:mt-4 [&_ul]:list-disc [&_ul]:ml-8 flex flex-col gap-2 text-base-650"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default SystemChatBox;
