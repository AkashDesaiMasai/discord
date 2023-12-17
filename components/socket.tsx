"use client";
import useStore from "@/store/OnlineUser";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketComp = ({ userId }: { userId: string }) => {
  const { setOnlineUsers } = useStore();

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      query: {
        userId: userId,
      },
    });

    // Listen for updates on online users
    socket.on("setOnline", (onlineUserIds: string[]) => {
      // Update the onlineUsers state based on the received user IDs
      setOnlineUsers(onlineUserIds);
    });
    // Clean up event listeners when the component unmounts
    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, [userId]); // Include userId in the dependency array if you want to react to changes in userId

  return <></>;
};

export default SocketComp;
