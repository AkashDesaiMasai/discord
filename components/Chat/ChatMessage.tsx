"use client";
import { useChatQueries } from "@/hooks/use-chat-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type ChatMessagesProps = {
  paramValue: string;
};

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false, // Set this to false for 24-hour format
};

const ChatMessages = ({ paramValue }: ChatMessagesProps) => {
  const apiUrl = "http://localhost:3000/api/socket/DirectMessage";
  const queryKey = `chat:${paramValue}`;
  const paramKey = "conversationId";
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQueries({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  const chatContainerRef = useRef(null);

  if (isFetchingNextPage) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
      <div ref={chatContainerRef}>
        <div className="flex flex-col flex-1 px-3">
          <div className="flex-1"></div>
          {data &&
            data?.pages[0]?.items
              ?.slice()
              .reverse()
              .map((e) => (
                <div className="flex my-3 gap-2 " key={e.id}>
                  <Avatar className="h-12 w-12 mt-4 ">
                    <AvatarImage src={e?.sender.imageUrl} alt="@shadcn" />
                    <AvatarFallback>
                      {e.sender.name
                        .split(" ")
                        .map((e) => e[0])
                        .join(" ")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-primary m-2">
                    <div className="flex gap-2">
                      <h1 className="font-bold hover:underline ">
                        {e.sender.name}
                      </h1>
                      <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-400">
                        {new Date(e.createdAt).toLocaleString("en-US", options)}
                      </p>
                    </div>
                    <p className="text-base font-semibold  text-zinc-600 dark:text-zinc-400">
                      {e.content}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
   
  );
};

export default ChatMessages;
