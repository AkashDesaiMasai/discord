"use client";
import {
  Channel,
  ChannelType,
  Member,
  MemberRole,
  Profile,
} from "@prisma/client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ToolTip } from "../ToolTip/toooltip";
import { UseModal } from "@/hooks/useModalStore";
import { PlusCircle } from "lucide-react";
import ServerChannels from "./ServerChannel";
import ServerMembers from "./ServerMembers";

type TextChannelProps = {
  label: string;
  channeltype?: ChannelType;
  sectionType: "channel" | "Member";
  data: Channel[] | (Member & { profile: Profile })[];
  Role: MemberRole;
};

const ServerSection = ({
  label,
  channeltype,
  data,
  Role,
  sectionType,
}: TextChannelProps) => {
  const { onOpen } = UseModal();
  const isChannelArray = (array: any[]): array is Channel[] =>
    array.length > 0 && typeof array[0] === "object" && "type" in array[0];
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full px-2"
    >
      <AccordionItem value="item-1">
        <div className="flex w-full items-center">
          <div className="flex-1">
            <AccordionTrigger className="text-zinc-600 dark:text-zinc-400 p-3 font-bold  uppercase text-sm">
              {label}
            </AccordionTrigger>
          </div>
          {Role !== "GUEST" && sectionType == "channel" && (
            <ToolTip
              content={"create channel"}
              className={"text-sm"}
              side="top"
            >
              <PlusCircle
                onClick={() =>
                  onOpen("createChannel", { channelTypeData: channeltype })
                }
                className="h-4 w-4 mr-2"
              />
            </ToolTip>
          )}
        </div>

        <AccordionContent className="data-[state=open] text-muted-foreground font-semibold px-3 text-sm ">
          {sectionType === "channel" &&
            isChannelArray(data) &&
            data.map((channel) => (
              <div key={channel.id}>
                <ServerChannels channel={channel} Role={Role} />
              </div>
            ))}

          {sectionType === "Member" &&
            !isChannelArray(data) &&
            data.map((member) => (
              <div key={member.id}>
                <ServerMembers member={member} />
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ServerSection;
