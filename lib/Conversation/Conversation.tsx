import db from "@/lib/db/index";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    console.error('No existing conversation found. Creating a new conversation.');
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

 
  return conversation;
};


const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: true,
        memberTwo: true,
      },
    });
  } catch (err) {
    // console.log("[findConversationError]", err);
  }
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    const createdConversation = await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: true,
        memberTwo: true,
      },
    });

    console.log("Conversation created:", createdConversation);
    return createdConversation;
  } catch (err) {
    return null;
  }
};
