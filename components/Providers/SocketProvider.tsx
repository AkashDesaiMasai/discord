"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";


interface SocketContextProps {
  children: ReactNode;
  userId: string;
}

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
});

export const useSocket = (): SocketContextType => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children, userId }: SocketContextProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const socketInstance = io("http://localhost:3001", {
      query: {
        userId: userId,
      },
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("setOnline", (onlineUserIds: string[]) => {
      setOnlineUsers(onlineUserIds);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect().removeAllListeners();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
