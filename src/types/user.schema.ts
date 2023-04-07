import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  fritzbox: z.object({
    username: z.string(),
    password: z.string(),
  }),
});
