import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@prisma/client";
import { PhoneCall, Video } from "lucide-react";
import OnlineStatus from "../OnlineStatus";
import { profile } from "console";

type ChatHeaderProps = {
  Profile: Profile;
};
const ChatHeader = ({ Profile }: ChatHeaderProps) => {
  // console.log(Profile);
  return (
    <div className="flex  p-2 border-b-2 border-popover shadow-lg justify-between">
      <div className="flex gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={Profile?.imageUrl} alt="@shadcn" />
          <AvatarFallback>
            {Profile.name
              .split(" ")
              .map((e) => e[0])
              .join(" ")}
          </AvatarFallback>
        </Avatar>
        <p className="flex flex-col text-primary text-left">
          <span className="font-bold">{Profile.name}</span>
          <span className="text-primary text-xs">
            <OnlineStatus userId={Profile.userId} />
          </span>
        </p>
      </div>
      <div className="flex gap-9 justify-center items-center pr-8">
        <PhoneCall className="h-6 w-6" />
        <Video className="h-8 w-8" />
      </div>
    </div>
  );
};

export default ChatHeader;
