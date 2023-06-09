import z from "zod"
import { v4 as uuidv4 } from "uuid"
import { hashSync } from "bcrypt"

export const UserSchema = z.object({
    id: z.string().default(uuidv4()),
    name: z.string().min(3, "Name too short").max(100, "Name too long"),
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6, "Password too short")
        .transform((pswd) => hashSync(pswd, 10)),
})

export const UpdateUserSchema = z.object({
    id: z.string().default(uuidv4()).optional(),
    name: z
        .string()
        .min(3, "Name too short")
        .max(100, "Name too long")
        .optional(),
    email: z.string().email("Invalid email").optional(),
    password: z.string().min(6, "Password too short").optional(),
})

export type User = z.infer<typeof UserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
