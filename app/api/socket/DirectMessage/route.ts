import { NextResponse } from "next/server";
import ObjectId from "bson-objectid";
import db  from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";


const prisma = db;

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    // Retrieve user profile
    const profile = await getUserAuth();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const conversationId = searchParams.get("conversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Conversation ID missing", { status: 400 });
    }

    if (cursor === "0") {
      let messages = await prisma.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId,
        },
        include: {
          sender: true,
          receiver: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor = null;

      if (messages.length === MESSAGES_BATCH) {
        nextCursor = messages[MESSAGES_BATCH - 1].id;
      }

      return NextResponse.json({
        items: messages,
        nextCursor,
      });
    }

    // If cursor is not "0," proceed with the cursor-related logic
    const cursorObjectId: ObjectId | null = cursor ? ObjectId.createFromHexString(cursor) : null;

    let messages = await prisma.directMessage.findMany({
      take: MESSAGES_BATCH,
      skip: 1,
      cursor: cursorObjectId !== null ? { id: cursorObjectId.toHexString() } : undefined,
      where: {
        conversationId,
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[DIRECT_MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
