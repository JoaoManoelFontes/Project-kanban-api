import { UserSchema, User } from "../../types/userTypes";
import { UserRepository } from "../../repositories/userRepository";
import { ZodIssue } from "zod";

export async function createUser(
  userRepository: UserRepository,
  user: User
): Promise<User | ZodIssue[] | Error> {
  const result = UserSchema.safeParse(user);

  if (result.success) {
    const user = await userRepository.findByEmail(result.data.email);
    if (user) {
      return new Error("User already exists");
    }
    return await userRepository.create(result.data);
  } else {
    return result.error.issues;
  }
}
