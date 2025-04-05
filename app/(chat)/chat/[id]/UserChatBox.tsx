import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const UserChatBox = () => {
  return (
    <div className="flex items-start gap-2 bg-base-100 p-4 rounded-xl">
      <Avatar>
        <AvatarFallback className="text-xs">HP</AvatarFallback>
      </Avatar>
      <div>
        in this attached code, i want to functionality that currentlly fixed
        schema is for form like name and alias, api url, and add form, i want to
        dynamic form like if user click on add button which is placing after
        menu like general, add form and then add button, if user click on that
        then another tab is added and in schema a oe field is added by name of
        which user enter in popup of add menu, inside that take user need either
        form is need or list of something which is gotten in api response then
        take api and table style in nextjs 15, with tailwind, shadcn,
        react-hook-form
      </div>
    </div>
  );
};

export default UserChatBox;
