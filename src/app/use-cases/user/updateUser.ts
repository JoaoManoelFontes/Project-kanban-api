import { ZodIssue } from "zod";
import { UserRepository } from "../../repositories/userRepository";
import { User, UserSchema } from "../../types/userTypes";
import bycript from "bcrypt";

type props = {
  repository: UserRepository;
  id: string;
  user: Partial<User>;
};

export async function updateUser({
  repository,
  id,
  user,
}: props): Promise<User | Error | ZodIssue[]> {
  const userExists = await repository.findById(id);

  if (userExists) {
    if (user.password) {
      if (bycript.compareSync(user.password, userExists.password)) {
        return new Error("Password must be different");
      }

      user.password = bycript.hashSync(user.password, 10);
    }

    const updatedUser = await repository.update(id, user);

    const result = UserSchema.safeParse(updatedUser);

    if (result.success) {
      return result.data;
    }

    return result.error.issues;
  } else {
    return new Error("User not found");
  }
}
