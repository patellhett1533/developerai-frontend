import React, { useEffect } from 'react'
import { Check, Copy, CopyCheck } from 'lucide-react';
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";

const RenderCode = (code: any, filename: string, key: number) => {
    const [isCopied, setIsCopied] = React.useState(false);

    useEffect(() => {
      if(isCopied){
        setTimeout(() => {
          setIsCopied(false)
        }, 3000)
      }
    }, [isCopied])

  return (
    <div className="mb-4" key={key}>
        <div className="flex items-center justify-between mt-4 bg-base-150 px-2 py-3">
        <h2 className="text-base-800 font-medium text-sm">{filename}</h2>
        <div className="cursor-pointer" onClick={() => {navigator.clipboard.writeText(code); setIsCopied(true)}}>
            {isCopied ? (
            <Check size={14} className='text-green-600' />
            ) : (
            <Copy size={14} />
            )}
                
        </div>
        </div>
        <SyntaxHighlighter language="typescript" style={atomOneDarkReasonable} children={code} showInlineLineNumbers={true}>
        </SyntaxHighlighter>
    </div>
  )
}

export default RenderCode;