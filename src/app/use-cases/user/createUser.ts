import { UserSchema, User } from "../../types/userTypes"
import { UserRepository } from "../../repositories/userRepository"
import { ZodIssue } from "zod"

interface createUserRequest {
    userRepository: UserRepository
    user: User
}

export async function createUser({
    userRepository,
    user,
}: createUserRequest): Promise<User | Error> {
    const userExists = await userRepository.findByEmail(user.email)
    if (userExists) {
        return new Error("Email already registered")
    }
    return await userRepository.create(user)
}
