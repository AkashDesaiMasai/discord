import * as z from "zod"
import { CompleteProfile, relatedProfileSchema, CompleteConversation, relatedConversationSchema } from "./index"

export const directMessageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  conversationId: z.string(),
  fileUrl: z.string(),
  content: z.string(),
  deleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDirectMessage extends z.infer<typeof directMessageSchema> {
  sender: CompleteProfile
  receiver: CompleteProfile
  conversation: CompleteConversation
}

/**
 * relatedDirectMessageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedDirectMessageSchema: z.ZodSchema<CompleteDirectMessage> = z.lazy(() => directMessageSchema.extend({
  sender: relatedProfileSchema,
  receiver: relatedProfileSchema,
  conversation: relatedConversationSchema,
}))
