import { UserRepository } from "../../repositories/userRepository"
import { User } from "../../types/userTypes"

interface findUserRequest {
    userRepository: UserRepository
    id: string
}

interface findUserResponse {
    user: User
}

export async function findUser({
    userRepository: repository,
    id,
}: findUserRequest): Promise<findUserResponse> {
    const user = await repository.findById(id)
    return { user }
}
