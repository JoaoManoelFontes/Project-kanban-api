import { UserRepository } from "../../repositories/userRepository";
import { User } from "../../types/userTypes";

export async function name(
  repository: UserRepository,
  id: string
): Promise<User | Error> {
  const user = await repository.findById(id);
  if (user == null) {
    return new Error("User not found");
  }

  return user;
}
