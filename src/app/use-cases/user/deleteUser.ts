import { UserRepository } from "../../repositories/userRepository"

interface deleteUserRequest {
    userRepository: UserRepository
    id: string
}

export async function deleteUser({
    userRepository,
    id,
}: deleteUserRequest): Promise<void> {
    await userRepository.delete(id)
}
