import { User } from "../types/userTypes"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"

type Override = Partial<User>

export function createUserFactory(overrides?: Override): User {
    const user: User = {
        id: uuidv4(),
        name: "John Doe",
        password: bcrypt.hashSync("password", 10),
        email: "test@mail.com",
        ...overrides,
    }

    return user
}
