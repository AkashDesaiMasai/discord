"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";
import { MemberRole } from "@prisma/client";
import { UseModal } from "@/hooks/useModalStore";

type serverHeaderProps = {
  server: ServerWithMembersWithProfiles;
  Role: string;
};
const ServerHeader = ({ server, Role }: serverHeaderProps) => {
  const isAdmin = Role === MemberRole.ADMIN;
  const isModerator = Role === MemberRole.MODERATOR || isAdmin;

  const { onOpen } = UseModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex w-72 h-12 items-center p-3 border-b-2 shadow-md text-xl justify-between">
          <div className="capitalize">{server.name}</div>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-popover">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-indigo-600 dark:text-indigo-400 font-semibold focus:bg-indigo-500 focus:text-white"
          >
            Invite People
            <UserPlus className="h-6 w-6 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className=" font-semibold focus:bg-indigo-500 focus:text-white">
            Create Channel
            <PlusCircle className="h-6 w-6 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={()=>onOpen("EditServer",{server})} className=" font-semibold focus:bg-indigo-500 focus:text-white">
            Server Settings
            <Settings className="h-6 w-6 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className=" font-semibold focus:bg-indigo-500 focus:text-white">
            Manage Members
            <User className="h-6 w-6 ml-auto" />
          </DropdownMenuItem>
        )}

       {isModerator&& <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
          onClick={()=>onOpen("deleteServer",{server})}
           className="group text-red-500 focus:bg-red-500 focus:text-white font-semibold">
            Delete Server
            <Trash className="h-6 w-6 ml-auto" />
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
        onClick={()=>onOpen("LeaveServer",{server})}
          disabled={isAdmin}
          className="group text-red-500 focus:bg-red-500 focus:text-white font-semibold"
        >
          Leave Server
          <LogOut className="h-6 w-6 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
