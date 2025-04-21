import React, { useEffect } from "react";
import { marked } from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, CopyCheck } from "lucide-react";

const SystemChatBox = ({ message }: { message: any }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  useEffect(() => {
    if(isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  let html: { file: string; code: string }[] = [];

  try {
    const raw = message.content.replace(/```json|```/g, "").trim();
    
    const parsed = JSON.parse(raw);

    parsed.forEach((fileObj: Record<string, string>) => {
      const filePath = Object.keys(fileObj)[0];
      const code = fileObj[filePath];

      html.push({
        file: filePath,
        code: code,
      });
    });
  } catch (error) {
    console.error("Error parsing content in SystemChatBox:", error);
  }

  return html.map((item, index) => (
    <div key={index} className="mb-4">
      <div className="flex items-center justify-between mt-4 bg-base-150 px-2 py-3">
        <h2 className="text-base-800 font-medium text-sm">{item.file}</h2>
        <div className="cursor-pointer" onClick={() => {navigator.clipboard.writeText(item.code); setIsCopied(true)}}>
          {isCopied ? (
             <CopyCheck size={14} />
          ) : (
            <Copy size={14} />
          )}
         
        </div>
      </div>
      <SyntaxHighlighter language="typescript" style={atomOneDarkReasonable}>
        {item.code}
      </SyntaxHighlighter>
    </div>
  ));
};

export default SystemChatBox;
