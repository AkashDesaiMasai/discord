import * as z from "zod"
import { CompleteConversation, relatedConversationSchema } from "./index"

export const directMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  content: z.string(),
  fileUrl: z.string().nullish(),
  deleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDirectMessage extends z.infer<typeof directMessageSchema> {
  conversation: CompleteConversation
}

/**
 * relatedDirectMessageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedDirectMessageSchema: z.ZodSchema<CompleteDirectMessage> = z.lazy(() => directMessageSchema.extend({
  conversation: relatedConversationSchema,
}))
