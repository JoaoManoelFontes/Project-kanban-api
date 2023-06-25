import { User } from "../../types/userTypes"
import { UserRepository } from "../../repositories/userRepository"

interface createUserRequest {
    userRepository: UserRepository
    user: User
}

interface createUserResponse {
    createdUser: User
}

export async function createUser({
    userRepository,
    user,
}: createUserRequest): Promise<createUserResponse> {
    const userExist = await userRepository.findByEmail(user.email)

    if (userExist) {
        throw new Error("User already exists")
    }
    const createdUser = await userRepository.create(user)
    return { createdUser }
}
