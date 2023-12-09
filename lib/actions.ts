"use server";
import { Profile } from "@prisma/client";
import db from "./db";
import getProfile from "./auth/getProfile";

export async function sendFriendRequest(userId: string) {
  const user = await getProfile();
  if (!user) return;
  if (user.id === userId) return null;
  const existingFriendRequest = await db.friend.findFirst({
    where: {
      OR: [
        { fromProfileID: user.id, toProfileID: userId },
        { fromProfileID: userId, toProfileID: user.id },
      ],
    },
  });

  if (existingFriendRequest) {
    // Handle case where there is already a friend request or they are already friends
    return null;
  }

  // Create a new friend request
  const newFriendRequest = await db.friend.create({
    data: {
      fromProfileID: user.id,
      toProfileID: userId,
      isAccepted: false,
    },
  });

  return newFriendRequest;
}
export async function cancelFriendRequest(userId: string) {
  const user = await getProfile();
  if (!user) return;
  if (user.id === userId) return null;

  // Cancel the friend request
  const deletedFriendRequest = await db.friend.deleteMany({
    where: {
      fromProfileID: user.id,
      toProfileID: userId,
      isAccepted: false,
    },
  });

  return deletedFriendRequest;
}
