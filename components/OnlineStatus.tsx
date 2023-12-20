"use client";
import useStore from "@/store/OnlineUser";
import { useSocket } from "./Providers/SocketProvider";

type OnlineStatusProps = {
  userId: string;
};
export default function OnlineStatus({ userId }: OnlineStatusProps) {

  const { onlineUsers } = useSocket();
  // console.log(onlineUsers, userId);
  return <>{onlineUsers.includes(userId) ? "Online" : "Offline"}</>;
}
