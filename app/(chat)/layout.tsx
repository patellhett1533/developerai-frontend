import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../_components/Sidebar";
import { ChatProvider } from "./chat/[projectId]/useChat";

interface Props {
  children: React.ReactNode;
}

const layout: React.FC<Props> = (props) => {
  return (
    <ChatProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="h-screen overflow-hidden w-full p-4 flex items-center justify-center">
          {props.children}
        </div>
      </SidebarProvider>
    </ChatProvider>
  );
};

export default layout;
