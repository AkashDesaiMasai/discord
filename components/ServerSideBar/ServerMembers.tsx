import { Member, Profile } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type serverMembersProps = {
  member: Member & { profile: Profile };
};

const ServerMembers = ({key, member }: serverMembersProps) => {
  return (
    <div className="flex gap-2 items-center p-3 hover:bg-muted-foreground/10 rounded-lg">
      <Avatar>
        <AvatarImage src={member.profile.imageUrl} />
        <AvatarFallback>cn</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm">
          {member.profile.name}
        
        </p>
        <p className="text-xs">#{member.profile.username}</p>
      </div>
    </div>
  );
};

export default ServerMembers;
