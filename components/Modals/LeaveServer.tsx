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

export const LeaveModal = () => {
  const { isOpen, onClose, onOpen, type, data } = UseModal();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const isModalOpen = isOpen && type === "LeaveServer";
  const { server } = data;
  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  console.log(server?.inviteCode);
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
          <DialogTitle className="text-2xl">Leave Server</DialogTitle>
          <DialogDescription>
           Are you Sure you want to do this?This acrion can
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  );
};
