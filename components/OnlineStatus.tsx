"use client"
import useStore from "@/store/OnlineUser";

type OnlineStatusProps = {
  userId: string;
};
export default function OnlineStatus({ userId }: OnlineStatusProps) {
  const { OnlineUsers } = useStore();
  console.log(OnlineUsers,userId)
  return <>{OnlineUsers.includes(userId) ? "Online" : "Offline"}</>;
}
