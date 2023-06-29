import * as z from "zod"

export const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export const manageEmailSchema = z.object({
  email: emailSchema.shape.email,
  token: z.string(),
  newsletter: z.boolean().default(false).optional(),
  transactional: z.boolean().default(false).optional(),
  marketing: z.boolean().default(false).optional(),
})
