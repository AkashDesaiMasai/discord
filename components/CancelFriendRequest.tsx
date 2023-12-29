"use client";
import { cancelFriendRequest } from "@/lib/actions/actions";

import { Profile } from "@prisma/client";
import { CrossIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  Profile: Profile;
};
const CancelFriendRequest = ({ Profile }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={async() => {
        try {
          await cancelFriendRequest(Profile.id);
          toast.error('friendRequest Cancelled')
             router.refresh();
        } catch (error) {
            toast.error('Something went wrong!')
        }
      }}
    >
      <X className="h-6 w-6 m-2" />
    </div>
  );
};

export default CancelFriendRequest;
