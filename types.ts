import { Server, Member, Profile } from "@prisma/client";
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & {
    profile: Profile;
  })[];
};

export type DirectMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  fileUrl: string;
  content: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender :Profile
  receiver: Profile
}