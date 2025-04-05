import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Github, Plus, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StackOverflow from "@/public/icons/StackOverflow";

const ChatInput = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <Textarea
          placeholder="Ask anything to developers !"
          className="p-4 leading-4 rounded-2xl bg-base-150 pb-16"
        ></Textarea>
        <div className="flex items-center gap-2 absolute bottom-4 left-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="" asChild>
              <Button className="w-8 h-8  rounded-full cursor-pointer bg-transparent border border-base-200 hover:bg-base-200">
                <Plus size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileUp size={12} className="" />
                Upload From Device
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileUp size={12} className="" />
                Connect Google Drive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="w-8 h-8  rounded-full cursor-pointer bg-transparent border border-base-200 hover:bg-base-200">
            <Github size={14} />
          </Button>
          <Button className="w-8 h-8  rounded-full cursor-pointer bg-transparent border border-base-200 hover:bg-base-200">
            <StackOverflow />
          </Button>
        </div>
        <Button className="w-8 h-8 bg-blue-800 rounded-full absolute bottom-4 right-4 cursor-pointer">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
