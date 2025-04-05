import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../_components/Sidebar";

interface Props {
  children: React.ReactNode;
}

const layout: React.FC<Props> = props => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-screen overflow-hidden w-full p-4">{props.children}</div>
    </SidebarProvider>
  );
};

export default layout;