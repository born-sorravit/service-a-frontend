import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Please enter full name",
    })
    .max(55, {
      message: "Full name must be less than 55 characters",
    }),
  email: z
    .string()
    .min(1, {
      message: "Please enter an Email.",
    })
    .max(50, {
      message: "Email should be less than 50 characters.",
    })
    .email({
      message: "Invalid email format.",
    }),
  username: z.string().min(5, { message: "Please enter username" }),
  password: z.string().min(5, { message: "Please enter password" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
