"use client";
import qs from "query-string";
import { useSocket } from "@/components/Providers/SocketProvider";
import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQueries = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const isConnected = useSocket();

  const fetchMessages:QueryFunction<any, string[], number>  = async ({ pageParam = undefined }) => {
    try {
      const url = qs.stringifyUrl(
        {
          url: apiUrl,
          query: {
            cursor: pageParam,
            [paramKey]: paramValue,
          },
        },
        { skipNull: true }
      );

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryFn: fetchMessages,
    initialPageParam: 0,
    queryKey: [queryKey],
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    refetchInterval: isConnected ? false : 1000,
  });

  // You can also log the error if it occurs
  if (error) {
    console.error("Error in useChatQueries:", error);
  }

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  };
};
