import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessage";
import { ChatInput } from "@/components/Chat/chatInput";
import { getOrCreateConversation } from "@/lib/Conversation/Conversation";
import getProfile from "@/lib/auth/getProfile";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import React from "react";

type ChatPageProps = {
  params: {
    DirectMessage: String;
  };
};

const page = async ({ params }: ChatPageProps) => {
  const userAuth = await auth();
  const user = await getProfile();

  if (!user) {
    redirect("/");
  }
  const MemberId = params.DirectMessage;
  const conversation = await getOrCreateConversation(
    user.id.toString(),
    MemberId.toString()
  );
  let Member;
  if (conversation?.memberOneId === MemberId) {
    Member = conversation.memberOne;
  } else {
    Member = conversation?.memberTwo;
  }
  if (!Member || !conversation) return;

  return (
    <div className="max-w-3xl  h-[100%] flex flex-col mx-auto">
      <ChatHeader Profile={Member} />
      <ChatMessages />
      <ChatInput
        apiUrl="http://localhost:3001"
        query={{
          selfId: user.id,
          userId: Member.id,
          conversationId: conversation.id,
        }}
        name={Member.name}
        type="conversation"
      />
    </div>
  );
};

export default page;
