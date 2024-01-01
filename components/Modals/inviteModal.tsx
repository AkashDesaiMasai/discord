"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Server } from "@prisma/client";
import { UseModal } from "@/hooks/useModalStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  CheckCheckIcon,
  Copy,
  Ghost,
  Loader,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import useOrigin from "@/hooks/useOrigin";
import { toast } from "sonner";
import { updateInviteCode } from "@/lib/actions/inviteCode";

export const InviteModal = () => {
  const { isOpen, onClose, onOpen, type, data } = UseModal();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const isModalOpen = isOpen && type === "invite";
  const { server } = data;
  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);
    toast.success("Link copied");
    setTimeout(() => setIsCopied(false), 1000);
  };

  const newLink = async () => {
    try {
      setIsloading(true);
      if (!server || !server.id) {
        throw new Error("Missing Servre id");
      }
      const response = await updateInviteCode({ serverId: server?.id || "" });
      
      onOpen("invite", { server: response! });
      toast.success("New Link Generated");
    } catch (err) {
      toast.error("something went wrong");
      console.log("Regenrate Link error", err);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[425px] p-0">
        <DialogHeader className="flex flex-col justify-center mt-4 items-center">
          <DialogTitle className="text-2xl">Invite People</DialogTitle>
          <DialogDescription>
            Send this Invite Link to a friend to join this Server
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col p-4 gap-2">
          <div>
            <label className="capitalize font-semibold">
              Server Invite link
            </label>
          </div>
          <div className="flex w-full gap-2">
            <Input
              disabled={isLoading}
              className="outline-none  focus-visible:ring-0 focus-visible:ring-offset-0 text-muted-foreground"
              autoFocus={false}
              value={inviteUrl}
            />
            <Button
              disabled={isLoading || isCopied}
              size={"icon"}
              onClick={onCopy}
            >
              {isCopied ? (
                <CheckCheckIcon className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={newLink}
            variant={"ghost"}
            className="flex gap-2"
          >
            <span>
              {isLoading ? "Generating a new Link" : "Generate a new Link"}
            </span>
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
