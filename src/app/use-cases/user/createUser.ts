import { User } from "../../types/userTypes"
import { UserRepository } from "../../repositories/userRepository"

interface createUserRequest {
    userRepository: UserRepository
    user: User
}

export async function createUser({
    userRepository,
    user,
}: createUserRequest): Promise<User | Error> {
    const userExist = await userRepository.findByEmail(user.email)

    if (userExist) {
        throw new Error("User already exists")
    }

    return await userRepository.create(user)
}
