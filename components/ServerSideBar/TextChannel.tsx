"use client";
import { Channel } from "@prisma/client";

type TextChannelProps = {
  channels: Channel[];
};
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Hash, PlusCircle } from "lucide-react";

const TextChannel = ({ channels }: TextChannelProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full px-2"  >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-zinc-600 dark:text-zinc-400 p-3 font-bold  uppercase text-sm">
          Text Channels
          <PlusCircle className="h-4 w-4 mr-2 ml-auto" />
        </AccordionTrigger>
        <AccordionContent  className="data-[state=open] text-muted-foreground font-semibold text-sm ">
          {channels.map((channel) => (
            <div className="flex items-center hover:bg-muted-foreground/10 hover:text-primary p-3"><Hash className="h-4 w-4"/>{channel.name}</div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TextChannel;
