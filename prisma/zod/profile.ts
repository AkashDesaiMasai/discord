import * as z from "zod"
import { CompleteServer, relatedServerSchema, CompleteChannel, relatedChannelSchema, CompleteMember, relatedMemberSchema, CompleteDirectMessage, relatedDirectMessageSchema, CompleteConversation, relatedConversationSchema, CompleteFriend, relatedFriendSchema } from "./index"

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  imageUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteProfile extends z.infer<typeof profileSchema> {
  servers: CompleteServer[]
  Channels: CompleteChannel[]
  members: CompleteMember[]
  directMessagesSent: CompleteDirectMessage[]
  directMessagesReceived: CompleteDirectMessage[]
  conversationsInitiated: CompleteConversation[]
  conversationsReceived: CompleteConversation[]
  friendRequestsSent: CompleteFriend[]
  friendRequestsReceived: CompleteFriend[]
}

/**
 * relatedProfileSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProfileSchema: z.ZodSchema<CompleteProfile> = z.lazy(() => profileSchema.extend({
  servers: relatedServerSchema.array(),
  Channels: relatedChannelSchema.array(),
  members: relatedMemberSchema.array(),
  directMessagesSent: relatedDirectMessageSchema.array(),
  directMessagesReceived: relatedDirectMessageSchema.array(),
  conversationsInitiated: relatedConversationSchema.array(),
  conversationsReceived: relatedConversationSchema.array(),
  friendRequestsSent: relatedFriendSchema.array(),
  friendRequestsReceived: relatedFriendSchema.array(),
}))
