import { Profile } from "@prisma/client";
import {  MessageCircleIcon, UserPlus2Icon } from "lucide-react";
import Image from "next/image";
import FriendRequestButton from "./FriendRequestButton";
import CancelFriendRequest from "./CancelFriendRequest";
import OnlineStatus from "./OnlineStatus";
import { Separator } from "./ui/separator";

import Link from "next/link";

type Props = {
  AllUsers: Profile[];
  type?: "friendRequestSent" | "AllUsers" | "friendRequestReceived";
};

const Users = ({ AllUsers, type }: Props) => {
  if (!AllUsers || AllUsers.length === 0) {
    return (
      <div>
        <div className="py-6 group hover:bg-popover">
          {type === "friendRequestSent" && "No pending Requets!"}
          {type === "friendRequestReceived" && "No pending Requets!"}
        </div>
      </div>
    );
  }

  return (
    <div>
      {AllUsers.map((User: Profile) => (
        <div
          key={User?.id}
          className="pt-2 rounded-md group hover:bg-muted-foreground/20"
        >
          <div className="flex px-4 justify-between">
            <div className="flex gap-2">
              <div className="flex items-center">
                <Image
                  src={User?.imageUrl || ""}
                  height={38}
                  width={38}
                  className="rounded-full"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold flex flex-row gap-2">
                  {User?.name || "No Name"}
                  <span className="text-sm text-gray-300 hidden group-hover:flex">
                    #{User?.username?.toLowerCase()}
                  </span>
                </div>
                <div>
                  {type === "friendRequestSent" ? (
                    "pending..."
                  ) : (
                    <OnlineStatus userId={User.id} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <div>
                <Link href={`/channels/@me/${User.id}`}>
                  <MessageCircleIcon />
                </Link>
              </div>
              {type === "AllUsers" && (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-popover">
                  <FriendRequestButton Profile={User} />
                </div>
              )}
              {type === "friendRequestSent" && (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-popover">
                  <CancelFriendRequest Profile={User} />
                </div>
              )}
            </div>
          </div>
          <Separator className="my-4" />
        </div>
      ))}
    </div>
  );
};

export default Users;
