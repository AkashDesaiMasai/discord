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
    <div className="max-w-3xl flex  h-screen flex-col gap-8 m-auto">
      <Tabs defaultValue="Online" className="w-full h-screen">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Online">Online</TabsTrigger>
          <TabsTrigger value="AllUsers">All Users</TabsTrigger>
          <TabsTrigger value="Sent">Request Sent</TabsTrigger>
          <TabsTrigger value="Received">Request Received</TabsTrigger>
        </TabsList>
        <TabsContent value="Online">
          <Card>
            <CardHeader>
              <CardTitle>Online Users</CardTitle>
              <CardDescription>
               Active Users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Users AllUsers={AllUsers} type={"AllUsers"} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="AllUsers">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Send Friend Requests and make new friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Users AllUsers={AllUsers} type={"AllUsers"} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Sent">
          <Card>
            <CardHeader>
              <CardTitle>Request Sent</CardTitle>
              <CardDescription>
                Wait for other User to accept your Request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Users
                  AllUsers={friendrequestSent}
                  type={"friendRequestSent"}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Received">
          <Card>
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
                <Users
                  AllUsers={friendrequestReceived}
                  type={"friendRequestReceived"}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
