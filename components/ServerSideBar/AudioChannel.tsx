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
import { Music, PlusCircle, Volume, Volume2 } from "lucide-react";

const AudioChannel = ({ channels }: TextChannelProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full px-2"
    >
      <AccordionItem value="item-1 p-3">
        <AccordionTrigger className="text-zinc-600 dark:text-zinc-400 p-3 font-bold  uppercase text-sm">
          Voice Channels
          <PlusCircle className="h-4 w-4 mr-2 ml-auto" />
        </AccordionTrigger>
        <AccordionContent className="data-[state=open]  text-muted-foreground font-semibold text-sm ">
          {channels.length === 0 ? (
            <div className="p-3 text-xs px-5">No Voice channels to display, create new Voice Channel</div>
          ) : (
            channels.map((channel) => (
              <div className=" flex items-center gap-2 hover:bg-muted-foreground/10 hover:text-primary p-3">
                <Volume2 className="h-4 w-4" />
                {channel?.name}
              </div>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AudioChannel;
