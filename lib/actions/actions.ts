"use server";
import db from "../db";
import getProfile from "../auth/initialProfile";


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
        senderId: user.id as string,
        receiverId: Receiver,
        conversationId: conversationId as string,
        fileUrl: fileUrl || "", // Provide a default value if fileUrl is undefined
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    console.log("Message created:", createdMessage);
  } catch (err) {
    console.error("[Send Message Error]", err);
  }
}
export async function getMessaage({ paramValue }: { paramValue: string }) {
  const user = await getProfile();
  if (!user) return;
  const MESSAGES_BATCH = 10;

  try {
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
  } catch (err) {
    console.log("[Send Message Erro", err);
    return null;
  }
}
