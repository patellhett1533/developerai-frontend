"use client";
import React, { useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Plus, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { get_api } from "@/helper/api";
import { usePathname } from "next/navigation";
// import { Plus } from "lucide-react";

interface Props {
  property?: string;
}

interface Room {
  id: string;
  project_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: string;
  name: string;
  github_url: string;
  rooms: Room[];
  created_at: string;
  updated_at: string;
}

const items = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Scrapers",
    href: "/dashboard/scrapers",
  },
];

const teams = [
  {
    name: "Team 1",
    logo: Sparkles,
    plan: "Free",
  },
  {
    name: "Team 2",
    logo: Sparkles,
    plan: "Pro",
  },
];

const AppSidebar: React.FC<Props> = () => {
  const pathname = usePathname()
  const { isMobile } = useSidebar();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [activeTeam, setActiveTeam] = React.useState(projects[0]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await get_api(`/dashboard`);
      if (data) {
        setProjects(data);
        setRooms(data.find((project: Project) => project.id === pathname.split("/")[2])?.room || []);
        setActiveTeam(
          data.find((project: Project) => project.id == pathname.split("/")[2]) || projects[0]
        )
      }
    };
    fetchRooms();
  }, [])

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="h-full">
        <SidebarHeader className="flex flex-row items-center justify-between gap-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:text-base-700"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-base-100">
                      <Sparkles className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{activeTeam?.name}</span>
                      <span className="truncate text-xs">free</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Projects
                  </DropdownMenuLabel>
                  {projects.map((project, index) => (
                    <DropdownMenuItem
                      key={project.name}
                      onClick={() => setActiveTeam(project)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <Sparkles className="size-4 shrink-0" />
                      </div>
                      {project.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2" asChild>
                   <Link href="/project/new" className="flex items-center gap-2"> <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add Project</div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup className="h-[calc(100dvh-142px)] overflow-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {rooms.length > 0 && (
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/chat/${activeTeam?.id}`} className="hover:bg-base-200 border border-base-300">
                    <span className="flex items-center gap-2"><Plus size={14} /> New Chat</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              )}
              {rooms.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={item.id} className="hover:bg-base-200">
                      <span >{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="sticky bottom-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={""} alt={"Het Patel"} />
                      <AvatarFallback className="rounded-lg">HP</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Het Patel</span>
                      <span className="truncate text-xs">hettptl@gmail.com</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={""} alt={"Het Patel"} />
                        <AvatarFallback className="rounded-lg">HP</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Het Patel</span>
                        <span className="truncate text-xs">hettptl@gmail.com</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;