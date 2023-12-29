import * as z from "zod"
import { ChannelType } from "@prisma/client"
import { CompleteServer, relatedServerSchema, CompleteProfile, relatedProfileSchema } from "./index"

export const channelSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(ChannelType),
  serverId: z.string(),
  profileId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteChannel extends z.infer<typeof channelSchema> {
  server: CompleteServer
  profile: CompleteProfile
}

/**
 * relatedChannelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedChannelSchema: z.ZodSchema<CompleteChannel> = z.lazy(() => channelSchema.extend({
  server: relatedServerSchema,
  profile: relatedProfileSchema,
}))
