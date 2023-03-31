import { UserSchema, User } from "../../types/userTypes";
import { UserRepository } from "../../repositories/userRepository";

export async function createUser(
  userRepository: UserRepository,
  user: User
): Promise<User> {
  const data = UserSchema.parse(user);

  return await userRepository.create(data);
}
