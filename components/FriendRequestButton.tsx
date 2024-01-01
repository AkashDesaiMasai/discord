"use client";
import { Profile } from "@prisma/client";
import db from "@/lib/db";
import { UserPlus2Icon } from "lucide-react";
import React from "react";
import {getProfile} from "@/lib/auth/getProfile";
import { sendFriendRequest } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type Props = {
  Profile: Profile;
};

const FriendRequestButton = ({ Profile }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        try {
          const res = await sendFriendRequest(Profile.id);
          toast.success("friendRequest Sent");
          router.refresh();
        } catch (err) {
          toast.error("Something went wrong!");
        }
      }}
    >
      <UserPlus2Icon className="h-6 w-6 m-2" />
    </div>
  );
};

export default FriendRequestButton;
