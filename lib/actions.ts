"use server";
import { DirectMessage, Profile } from "@prisma/client";
import db from "./db";
import getProfile from "./auth/getProfile";
import { Content } from "next/font/google";
import { QueryFunction } from "@tanstack/react-query";

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

export async function SendMessaage({
  Receiver,
  conversationId,
  message,
}: {
  Receiver: string;
  conversationId: string;
  message: { content: string; fileUrl?: string }; // Make fileUrl optional
}) {
  const { content, fileUrl } = message;
  const user = await getProfile();

  if (!user || !conversationId) return;
  if (user.id === Receiver) return;
  if (!content && !fileUrl) return;

  try {
    const createdMessage = await db.directMessage.create({
      data: {
        content: content,
        senderId : user.id as string,
        receiverId: Receiver,
        conversationId: conversationId as string,
        fileUrl: fileUrl || "", // Provide a default value if fileUrl is undefined
      },
      include: {
        sender:true,
        receiver:true
      },
    });

    console.log("Message created:", createdMessage);
  } catch (err) {
    console.error("[Send Message Error]", err);
  }
}
export async function getMessaage({
  Receiver,
  conversationId,
  message,
}: {
  Receiver: string;
  conversationId: String;
  message: { content: string; fileUrl?: string };
}) {
  const { content, fileUrl = "" } = message;
  const user = await getProfile();
  if (!user || !conversationId) return;
  if (user.id === Receiver) return;
  if (!content && !fileUrl) return;

  console.log(message);
  try {
    const Message = await db.directMessage.create({
      data: {
        content: content,
        fileUrl,
        conversationId: conversationId as string,
      },
      include: {
        conversation: {
          include: {
            memberOne: true,
            memberTwo: true,
          },
        },
      },
    });
  } catch (err) {
    console.log("[Send Message Erro", err);
  }
}
