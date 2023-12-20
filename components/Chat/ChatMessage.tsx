import { useChatQuery } from "@/hooks/use-chat-query";
import React from "react";
import db from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
type chatMesagesProps = {
  paramKey: "channelId" | "conversationId";
  paramValue: string;
};

const ChatMessages = async ({ paramKey, paramValue }: chatMesagesProps) => {
  const apiUrl = "http://localhost:3000/api/socket/DirectMessage";
  const queryKey = `chat:${paramValue}`;

  const fetch = async () => {
    const MESSAGES_BATCH = 10;
    const messages = await db.directMessage.findMany({
      take: MESSAGES_BATCH,
      where: {
        conversationId: paramValue,
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages.reverse();
  };
  const data = await fetch();
  console.log(data);
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useChatQuery();

  //   // setInterval((fetchNextPage),2000)
  // console.log(data);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",

    hour12: false, // Set this to false for 24-hour format
  };
  return (
    <div className="flex  flex-col flex-1 px-3">
      <div className="flex-1"></div>
      {data.map((e) => (
        <div className="flex flex-col">
          <div className="flex gap-2 ">
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
                <h1 className="font-bold hover:underline ">{e.sender.name}</h1>
                <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-400">
                  {e.createdAt.toLocaleString("en-US", options)}
                </p>
              </div>
              <p className="text-base font-semibold  text-zinc-600 dark:text-zinc-400">
                {e.content}
              </p>
            </div>
          </div>
          <div className="my-3" />
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
