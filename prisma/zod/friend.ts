import * as z from "zod"
import { CompleteProfile, relatedProfileSchema } from "./index"

export const friendSchema = z.object({
  id: z.string(),
  fromProfileID: z.string(),
  toProfileID: z.string(),
  isAccepted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFriend extends z.infer<typeof friendSchema> {
  RequestSent: CompleteProfile
  friendRequests: CompleteProfile
}

/**
 * relatedFriendSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFriendSchema: z.ZodSchema<CompleteFriend> = z.lazy(() => friendSchema.extend({
  RequestSent: relatedProfileSchema,
  friendRequests: relatedProfileSchema,
}))
