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

import { toast } from "sonner";

import { useParams, useRouter } from "next/navigation";
import { deleteServer } from "@/lib/actions/deleteServer";
import { deleteChannel } from "@/lib/actions/deleteChannel";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, onOpen, type, data } = UseModal();
  const [isLoading, setIsloading] = useState(false);
  const isModalOpen = isOpen && type === "deleteChannel";

  const params = useParams();

  const { channel } = data;
  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsloading(true);
      const res = await deleteChannel({
        serverId: params?.serverId as string,
        channelId: channel?.id!,
      });
      if(!res){
        throw new Error("Error Deleting Channel")
      }
      toast.success("deletedChannel");
     
      router.refresh();
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      setIsloading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[425px] p-0">
        <DialogHeader className="flex flex-col justify-center mt-4 p-4 items-center">
          <DialogTitle className="text-2xl">Delete Channel</DialogTitle>
          <DialogDescription className="font-semibold">
            Are you Sure you want to Delete Channel {channel?.name}?<br /> This
            action can&apos;t be undone !
          </DialogDescription>
        </DialogHeader>
        <div className="flex p-4 justify-between">
          <Button disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => onDelete()}
            variant={"destructive"}
          >
            Delete Channel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
