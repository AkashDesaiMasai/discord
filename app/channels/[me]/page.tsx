import getProfile from "@/lib/auth/getProfile";
import { auth } from "@clerk/nextjs";
import db from "@/lib/db";

import Image from "next/image";
import Users from "@/components/Users";
import { Profile } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = async () => {
  const userAuth = await auth();
  const user = await getProfile();

  if (!user) return;
  const AllUsers = await db.profile.findMany({});

  const friendsWithProfiles = await db.friend.findMany({
    where: {
      OR: [{ fromProfileID: user.id }, { toProfileID: user.id }],
    },
    include: {
      RequestSent: true,
      friendRequests: true,
    },
  });

  // Extract Profile information from each Friend
  const friendrequestSent: Profile[] = friendsWithProfiles.flatMap((friend) =>
    friend.fromProfileID === user.id ? friend.friendRequests : []
  );

  const friendrequestReceived: Profile[] = friendsWithProfiles.flatMap(
    (friend) => (friend.fromProfileID !== user.id ? friend.friendRequests : [])
  );

  return (
    <div className="max-w-3xl flex truncate flex-col gap-8 m-auto">
      <Tabs defaultValue="Online" className="w-full h-[100%]">
        <TabsList className="grid w-full truncate grid-cols-4">
          <TabsTrigger value="Online" >Online</TabsTrigger>
          <TabsTrigger value="AllUsers">All Users</TabsTrigger>
          <TabsTrigger value="Sent">Request Sent</TabsTrigger>
          <TabsTrigger value="Received">Request Received</TabsTrigger>
        </TabsList>
        <TabsContent value="Online">
          <Card className="h-[90vh]">
            <CardHeader>
              <CardTitle>Online Users</CardTitle>
              <CardDescription>Active Users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <ScrollArea className="h-[75vh] p-4 rounded-md border">
                  <Users AllUsers={AllUsers} type={"AllUsers"} />{" "}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="AllUsers">
          <Card className="h-[90vh]">
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Send Friend Requests and make new friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <ScrollArea className="h-[75vh] p-4 rounded-md border">
                  <Users AllUsers={AllUsers} type={"AllUsers"} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Sent">
          <Card className="h-[90vh]">
            <CardHeader>
              <CardTitle>Request Sent</CardTitle>
              <CardDescription>
                Wait for other User to accept your Request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <ScrollArea className="h-[75vh] p-4 rounded-md border">
                  <Users
                    AllUsers={friendrequestSent}
                    type={"friendRequestSent"}
                  />{" "}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Received">
          <Card className="h-[90vh]">
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                {!!friendrequestReceived.length
                  ? "Accept friend Request to include users in your friend list"
                  : "No Requets!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <ScrollArea className="h-[75vh] p-4 rounded-md border">
                  <Users
                    AllUsers={friendrequestReceived}
                    type={"friendRequestReceived"}
                  />{" "}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
