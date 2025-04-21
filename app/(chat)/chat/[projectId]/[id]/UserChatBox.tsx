import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const UserChatBox = ({ question }: { question: any }) => {
  return (
    <div className="flex items-start gap-2 bg-base-100 p-4 rounded-xl mt-8">
      <Avatar>
        <AvatarFallback className="text-xs">HP</AvatarFallback>
      </Avatar>
      <div>{question.content.question}</div>
    </div>
  );
};

export default UserChatBox;
