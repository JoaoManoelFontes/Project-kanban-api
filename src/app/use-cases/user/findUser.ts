import { UserRepository } from "../../repositories/userRepository";
import { User } from "../../types/userTypes";

export async function findUser(
  repository: UserRepository,
  id: string
): Promise<User | Error> {
  const user = await repository.findById(id);
  return user;
}
