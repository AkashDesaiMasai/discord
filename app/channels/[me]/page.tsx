import getProfile from "@/lib/auth/getProfile";
import { auth } from "@clerk/nextjs";
import db from "@/lib/db";
import React from "react";
import {
  Dot,
  MessageCircleIcon,
  OptionIcon,
  User2Icon,
  UserPlus2Icon,
} from "lucide-react";
import Image from "next/image";
import Users from "@/components/Users";
import { Profile } from "@prisma/client";

const page = async () => {
  const userAuth = await auth();
  const user = await getProfile();

  if (!user) return;
  const AllUsers = await db.profile.findMany({});

  const friendsWithProfiles = await db.friend.findMany({
    where: {
      OR: [{ fromProfileID: user.id }, { toProfileID: user.id }],
    },
    include: {
      RequestSent: true,
      friendRequests: true,
    },
  });

  // Extract Profile information from each Friend
  const friendrequestSent: Profile[] = friendsWithProfiles.flatMap((friend) =>
    friend.fromProfileID === user.id ? friend.friendRequests : []
  );

  const friendrequestReceived: Profile[] = friendsWithProfiles.flatMap(
    (friend) => (friend.fromProfileID !== user.id ? friend.friendRequests : [])
  );

  return (
    <div className="max-w-3xl flex flex-col gap-8 m-auto">
      <div className="flex flex-col justify-start">
        <div className="text-gray-400">Friend Requests Sent</div>
        <div className="w-full border px-2  mt-2 border-b-1 border-gray-300"></div>
        <Users AllUsers={friendrequestSent} type={"friendRequestSent"} />
      </div>
      <div className="flex flex-col justify-start">
        <div className="text-gray-400">Friend Request Received</div>
        <div className="w-full border px-2  mt-2 border-b-1 border-gray-300"></div>
        <Users
          AllUsers={friendrequestReceived}
          type={"friendRequestReceived"}
        />
      </div>
      <div className="flex flex-col justify-start">
        <div className="text-gray-400">All Users</div>
        <div className="w-full border px-2 mt-2 border-b-1 border-gray-300"></div>
        <Users AllUsers={AllUsers} type={"AllUsers"} />
      </div>
    </div>
  );
};

export default page;
