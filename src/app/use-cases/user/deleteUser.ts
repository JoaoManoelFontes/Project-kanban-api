import { UserRepository } from "../../repositories/userRepository";

export async function deleteUser(
  userRepository: UserRepository,
  id: string
): Promise<void | Error> {
  return await userRepository.delete(id);
}
