import * as z from "zod"
import { MemberRole } from "@prisma/client"
import { CompleteProfile, relatedProfileSchema, CompleteServer, relatedServerSchema } from "./index"

export const memberSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(MemberRole),
  profileId: z.string(),
  serverId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMember extends z.infer<typeof memberSchema> {
  profile: CompleteProfile
  server: CompleteServer
}

/**
 * relatedMemberSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMemberSchema: z.ZodSchema<CompleteMember> = z.lazy(() => memberSchema.extend({
  profile: relatedProfileSchema,
  server: relatedServerSchema,
}))
