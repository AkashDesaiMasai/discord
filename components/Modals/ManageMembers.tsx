"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Member, MemberRole, Profile } from "@prisma/client";
import { UseModal } from "@/hooks/useModalStore";

import {
  List,
  Loader2,
  Shield,
  ShieldCheck,
  ShieldEllipsis,
} from "lucide-react";
import { useState } from "react";

import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToolTip } from "../ToolTip/toooltip";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { changeRole } from "@/lib/actions/changeRole";
import { KickUser } from "@/lib/actions/kickUser";

export const ManageMembersModal = () => {
  const { isOpen, onClose, onOpen, type, data } = UseModal();;
  const [LoadingId, setIsloadingId] = useState("");
  const isModalOpen = isOpen && type === "manageMembers";
  const { server } = data;

  const onKick = async (
    Member: Member & {
      profile: Profile;
    }
  ) => {
    if (Member.role === "ADMIN") {
      return;
    }

    try {
      setIsloadingId(Member.id);

      const Server = await KickUser({ Member, serverId: server?.id! });
      toast.success(`Removed ${Member.profile.name}`);
      onOpen("manageMembers", { server: Server });
    } catch (error) {
      console.log("[Kick User Erro]", error);
      toast.error("Something went wrong");
    } finally {
      setIsloadingId("");
    }
  };

  const onRoleChange = async (Role: MemberRole, Member: Member) => {
    if (Role === "ADMIN" || Role === Member.role) {
      return;
    }
    try {
      setIsloadingId(Member.id);
      const newServer = await changeRole({
        Role,
        Member,
        serverId: server?.id!,
      });

      onOpen("manageMembers", { server: newServer });
      toast.success("Role Changed");
    } catch (err) {
      console.log("[onRoleChnage Error]", err);
      toast.error("something went wrong");
    } finally {
      setIsloadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[425px] p-0">
        <DialogHeader className="flex flex-col justify-center mt-4 items-center">
          <DialogTitle className="text-2xl">Manage Members</DialogTitle>
          <DialogDescription>
            {server?.members?.length} Members
          </DialogDescription>
          <div className="flex flex-col gap-3 w-full p-4">
            <ScrollArea className="max-h-80">
              {server &&
                server?.members?.map((User) => (
                  <div
                    key={User?.profile?.id}
                    className=" py-2 my-2 rounded-md group hover:bg-muted-foreground/20"
                  >
                    <div className=" flex px-4 gap-2 justify-between">
                      <div className="flex gap-2">
                        <div className="flex items-center">
                          <Image
                            src={User?.profile?.imageUrl || ""}
                            height={38}
                            width={38}
                            className="rounded-full"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-semibold flex flex-col ">
                            <div className="flex items-center gap-1">
                              {User?.profile?.name || "No Name"}

                              {User.role === "ADMIN" && (
                                <ToolTip
                                  content={"ADMIN"}
                                  className={"font-light text-xs"}
                                >
                                  <ShieldCheck className="h-4 w-4 text-rose-500" />
                                </ToolTip>
                              )}
                              {User.role === "MODERATOR" && (
                                <ToolTip
                                  content={"Moderator"}
                                  className={"font-light text-xs"}
                                >
                                  <ShieldEllipsis className="h-4 w-4 text-blue-500" />
                                </ToolTip>
                              )}
                              {User.role === "GUEST" && (
                                <ToolTip
                                  content={"GUEST"}
                                  className={"font-light text-xs"}
                                >
                                  <Shield className="h-4 w-4" />
                                </ToolTip>
                              )}
                            </div>
                            <span className="text-xs text-left text-gray-300 ">
                              #{User?.profile?.username?.toLowerCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {User.role !== "ADMIN" && LoadingId !== User.id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <List />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-52">
                              <DropdownMenuItem onClick={onClose}>
                                <Link href={`/me/${User.profileId}`}>
                                  Direct Message
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  Role
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                      className="flex gap-2"
                                      onClick={() =>
                                        onRoleChange("MODERATOR", User)
                                      }
                                    >
                                      <div className="flex">
                                        Moderator{" "}
                                        <ShieldEllipsis className="h-4 w-4 text-blue-500" />
                                      </div>
                                      <div>
                                        {User.role === "MODERATOR" && (
                                          <Checkbox checked={true} />
                                        )}
                                      </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="flex justify-between gap-2"
                                      onClick={() =>
                                        onRoleChange("GUEST", User)
                                      }
                                    >
                                      <div className="flex">
                                        Guest <Shield className="h-4 w-4" />
                                      </div>
                                      <div>
                                        {User.role === "GUEST" && (
                                          <Checkbox checked={true} />
                                        )}
                                      </div>
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                              <DropdownMenuItem
                                onClick={() => onKick(User)}
                                className="text-rose-500 focus:bg-rose-700"
                              >
                                Kick {User?.profile?.name || "User"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                        {User.role !== "ADMIN" && LoadingId === User.id && (
                          <Loader2 className="animate-spin h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
