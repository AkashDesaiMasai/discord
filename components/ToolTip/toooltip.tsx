import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SYSTEM_ENTRYPOINTS } from "next/dist/shared/lib/constants";
import React from "react";

type ToolTipProps = {
  children: React.ReactNode;
  content: String;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  className?: String;
};

export function ToolTip({ children, content, side, className }: ToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side || "right"} className={cn("m-4", className)}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
