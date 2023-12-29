import { NextResponse } from "next/server";
import { DirectMessage } from "@prisma/client";
import  ObjectId  from 'bson-objectid';
import db from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
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

    // Check if the cursor is "0" and skip cursor-related logic
    if (cursor === "0") {
      let messages = await db.directMessage.findMany({
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
    const cursorObjectId = cursor ? ObjectId.createFromHexString(cursor) : null;

    let messages = await db.directMessage.findMany({
      take: MESSAGES_BATCH,
      skip: 1,
      cursor: cursorObjectId,
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