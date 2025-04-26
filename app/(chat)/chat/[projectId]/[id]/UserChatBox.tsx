import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const UserChatBox = ({ question }: { question: string }) => {
  return (
    <div className="flex items-start gap-2 bg-base-150 p-4 rounded-xl mt-8">
      <Avatar>
        <AvatarFallback className="text-xs !bg-base-100">HP</AvatarFallback>
      </Avatar>
      <div>{question}</div>
    </div>
  );
};

export default UserChatBox;
