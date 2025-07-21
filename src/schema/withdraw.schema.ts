import { z } from "zod";

export const withdrawSchema = z.object({
  amount: z.string().min(1, { message: "Please enter amount" }),
  currency: z.string().min(1, { message: "Please enter currency" }),
  toUsername: z.string().min(1, { message: "Please enter recipient username" }),
});

export type WithdrawSchema = z.infer<typeof withdrawSchema>;
