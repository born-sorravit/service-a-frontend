import { z } from "zod";

export const depositSchema = z.object({
  amount: z.string().min(1, { message: "Please enter amount" }),
  currency: z.string().min(1, { message: "Please enter currency" }),
});

export type DepositSchema = z.infer<typeof depositSchema>;
