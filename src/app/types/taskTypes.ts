import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const TaskSchema = z.object({
  id: z.string().default(uuidv4()),
  title: z.string().max(100),
  content: z.string().max(1000),
  markAsMaking: z.boolean().default(false),
  markAsDone: z.boolean().default(false),
  userId: z.string().uuid(),
});

export type Task = z.infer<typeof TaskSchema>;
