import { ZodIssue } from "zod";
import { Login, LoginSchema } from "../../types/loginTypes";
import { UserRepository } from "../../repositories/userRepository";
import { User } from "../../types/userTypes";
import bcrypt from "bcrypt";

export async function userLogin(
  userRepository: UserRepository,
  params: Login
): Promise<User | ZodIssue[] | Error> {
  const result = LoginSchema.safeParse(params);
  if (result.success) {
    const user = await userRepository.findByEmail(result.data.email);

    if (user) {
      const passwordMatch = await bcrypt.compare(
        result.data.password,
        user.password
      );

      if (passwordMatch) {
        return user;
      } else {
        return new Error("Password doesn't match");
      }
    } else {
      return new Error("User not found");
    }
  } else {
    return result.error.issues;
  }
}
