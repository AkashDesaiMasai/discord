"use client";
import React from "react";
import { ToolTip } from "../ToolTip/toooltip";
import Link from "next/link";
import { Plus } from "lucide-react";
import { UseModal } from "@/hooks/useModalStore";

const CreateServerButton = () => {
  const { onOpen } = UseModal();

  return (
    <ToolTip content={"Create a Server"}>
      <div className="h-16 w-16 rounded-full bg-accent text-emerald-400 hover:rounded-3xl hover:bg-emerald-500 hover:text-white flex justify-center items-center font-semibold  transition-hover cursor-pointer">
        <button onClick={()=>onOpen("createServer",{})}>
          <Plus className="h-8 w-8" />
        </button>
      </div>
    </ToolTip>
  );
};

export default CreateServerButton;
