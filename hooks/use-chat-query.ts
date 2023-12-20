
import { useInfiniteQuery } from "@tanstack/react-query";


// interface ChatQueryProps {
//   queryKey: string;
//   apiUrl: string;
//   paramKey: "channelId" | "conversationId";
//   paramValue: string;
// }

export const useChatQuery = () =>
  // queryKey,
  // apiUrl,
  // paramKey,
  // paramValue,
  {
   
    const fetchProjects = async ({ pageParam }) => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10&cursor=" +
          pageParam
      );
      return res.json();
    };

    const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery({
      queryKey: ["projects"],
      queryFn: fetchProjects,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });
    return {
      data,
      isFetching,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
    };
  };
