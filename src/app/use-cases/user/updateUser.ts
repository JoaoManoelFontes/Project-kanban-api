import { ZodIssue } from "zod";
import { UserRepository } from "../../repositories/userRepository";
import { UpdateUser, UpdateUserSchema } from "../../types/userTypes";
import bycript from "bcrypt";

type props = {
  repository: UserRepository;
  id: string;
  user: UpdateUser;
};

export async function updateUser({
  repository,
  id,
  user,
}: props): Promise<UpdateUser | Error | ZodIssue[]> {
  const userExists = await repository.findById(id);

  if (userExists instanceof Error) {
    return new Error("User not found");
  } else {
    if (user.password) {
      if (bycript.compareSync(user.password, userExists.password)) {
        return new Error("Password must be different");
      }
    }

    const result = UpdateUserSchema.safeParse(user);

    if (result.success) {
      await repository.update(id, result.data);
      return await repository.findById(id);
    }

    return result.error.issues;
  }
}
