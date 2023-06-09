import { UserRepository } from "../../repositories/userRepository"

export async function deleteUser(
    userRepository: UserRepository,
    id: string
): Promise<void> {
    await userRepository.delete(id)
}
