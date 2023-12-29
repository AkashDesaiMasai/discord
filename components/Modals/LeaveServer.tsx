"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UseModal } from "@/hooks/useModalStore";

import { Button } from "../ui/button";

import { useState } from "react";
import useOrigin from "@/hooks/useOrigin";
import { toast } from "sonner";
import { LeaveServer } from "@/lib/actions/LeaveServer";
import { useRouter } from "next/navigation";

export const LeaveModal = () => {
  const { isOpen, onClose, onOpen, type, data } = UseModal();
  const [isLoading, setIsloading] = useState(false);
  const isModalOpen = isOpen && type === "LeaveServer";
  const { server } = data;
const router = useRouter();
  const onLeave =async () => {
    try {
      setIsloading(true);
      const res = await LeaveServer({ serverId: server?.id! });
      onClose()
      router.refresh();
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[425px] p-0">
        <DialogHeader className="flex flex-col justify-center mt-4 p-4 items-center">
          <DialogTitle className="text-2xl">Leave Server</DialogTitle>
          <DialogDescription className="font-semibold">
            Are you Sure you want to leave {server?.name}?<br /> You won't be
            able to re-join unless you are re-invited.
          </DialogDescription>
        </DialogHeader>
        <div className="flex p-4 justify-between">
          <Button disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={()=>onLeave()}
            variant={"destructive"}
          >
            Leave Server
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
