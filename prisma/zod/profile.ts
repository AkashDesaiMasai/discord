import * as z from "zod"
import { CompleteServer, relatedServerSchema, CompleteMember, relatedMemberSchema, CompleteConversation, relatedConversationSchema, CompleteFriend, relatedFriendSchema } from "./index"

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
  members: CompleteMember[]
  conversationsInitiated: CompleteConversation[]
  conversationsReceived: CompleteConversation[]
  RequestSent: CompleteFriend[]
  FriendRequests: CompleteFriend[]
}

/**
 * relatedProfileSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProfileSchema: z.ZodSchema<CompleteProfile> = z.lazy(() => profileSchema.extend({
  servers: relatedServerSchema.array(),
  members: relatedMemberSchema.array(),
  conversationsInitiated: relatedConversationSchema.array(),
  conversationsReceived: relatedConversationSchema.array(),
  RequestSent: relatedFriendSchema.array(),
  FriendRequests: relatedFriendSchema.array(),
}))
