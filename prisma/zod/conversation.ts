import * as z from "zod"
import { CompleteProfile, relatedProfileSchema, CompleteDirectMessage, relatedDirectMessageSchema } from "./index"

export const conversationSchema = z.object({
  id: z.string(),
  memberOneId: z.string(),
  memberTwoId: z.string(),
})

export interface CompleteConversation extends z.infer<typeof conversationSchema> {
  memberOne: CompleteProfile
  memberTwo: CompleteProfile
  directMessages: CompleteDirectMessage[]
}

/**
 * relatedConversationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedConversationSchema: z.ZodSchema<CompleteConversation> = z.lazy(() => conversationSchema.extend({
  memberOne: relatedProfileSchema,
  memberTwo: relatedProfileSchema,
  directMessages: relatedDirectMessageSchema.array(),
}))
