
import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters long.",
  }),
})

export const transactionSchema = z.object({
  amount: z.number().nonnegative().refine(value => !isNaN(value), {
    message: "Amount must be a valid number.",
  }),
  description: z.string().trim(),
  date: z.date(),
});

export type LoginFormValues = z.infer<typeof loginSchema>

