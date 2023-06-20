import { z } from "zod"
import { v4 as uuidv4 } from "uuid"

export const TaskSchema = z.object({
    id: z.string().default(uuidv4()),
    title: z.string().max(100),
    content: z.string().max(1000),
    markAsMaking: z.boolean().default(false),
    markAsDone: z.boolean().default(false),
    userId: z.string().uuid(),
})

export const UpdateTaskSchema = z.object({
    id: z.string().default(uuidv4()).optional(),
    title: z.string().max(100).optional(),
    content: z.string().max(1000).optional(),
    markAsMaking: z.boolean().default(false).optional(),
    markAsDone: z.boolean().default(false).optional(),
    userId: z.string().uuid().optional(),
})

export type Task = z.infer<typeof TaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>
