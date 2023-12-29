import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

type ToolTipProps = {
  children: React.ReactNode;
  content: String;
  side?: "top" | "right" | "bottom" | "left" | undefined;
};

export function ToolTip({ children, content, side }: ToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side||"right"} className="m-4">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
