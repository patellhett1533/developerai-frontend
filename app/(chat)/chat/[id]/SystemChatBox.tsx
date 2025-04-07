import React from "react";

const SystemChatBox = ({ message }: { message: string }) => {
  return (
    <div
      className="[&_h2]:text-lg [&_h2]:text-base-800 [&_h2]:font-medium [&_h2]:mt-4 [&_ul]:list-disc [&_ul]:ml-8 flex flex-col gap-2 text-base-650"
      dangerouslySetInnerHTML={{ __html: message }}
    >
      {/* <p>
        To fine-tune a Gemini model for specific purposes using external data
        sources like Stack Overflow and GitHub in a NestJS application, follow
        these steps:
      </p>
      <h2>Tuning Approach Using Gemini API</h2>
      <p>
        Googles Gemini models support Parameter Efficient Tuning (PET) via
        Google AI Studio or API, requiring minimal data and engineering effort.
        This method outperforms traditional prompt engineering and RAG for
        task-specific optimizations.
      </p>
      <h2>Key requirements:</h2>
      <ul>
        <li>
          Structured dataset with input-output examples (20+ for basic tuning,
          100+ recommended)
        </li>
        <li>Data formatted as CSV or Google Sheets</li>
        <li>Gemini API key with tuning permissions</li>
      </ul> */}
    </div>
  );
};

export default SystemChatBox;
