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
import { PlusCircle } from "lucide-react";

const VideoChannel = ({ channels }: TextChannelProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full px-2"
    >
      <AccordionItem
        value="item-1"
        className=" text-zinc-600 dark:text-zinc-400 px-3 font-bold  text-sm"
      >
        <div className="flex w-full  items-center">
          <div className="flex-1 ">
            <AccordionTrigger className="font-bold uppercase">
              Video Channels
            </AccordionTrigger>
          </div>
          <PlusCircle className="h-4 w-4 mr-2 " />
        </div>

        <AccordionContent className="data-[state=open] text-muted-foreground ">
          {channels.length === 0 ? (
            <div className=" text-xs px-3">
              No Video channels to display, create new Voice Channel
            </div>
          ) : (
            channels.map((channel) => (
              <div className="hover:bg-muted-foreground/10 hover:text-primary ">
                # {channel.name}
              </div>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default VideoChannel;
