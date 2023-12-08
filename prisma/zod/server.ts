import * as z from "zod"
import { CompleteProfile, relatedProfileSchema, CompleteMember, relatedMemberSchema, CompleteChannel, relatedChannelSchema } from "./index"

export const serverSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  inviteCode: z.string(),
  profileId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteServer extends z.infer<typeof serverSchema> {
  profile: CompleteProfile
  members: CompleteMember[]
  channels: CompleteChannel[]
}

/**
 * relatedServerSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedServerSchema: z.ZodSchema<CompleteServer> = z.lazy(() => serverSchema.extend({
  profile: relatedProfileSchema,
  members: relatedMemberSchema.array(),
  channels: relatedChannelSchema.array(),
}))
