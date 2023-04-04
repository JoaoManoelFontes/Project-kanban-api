import { UserRepository } from "../../repositories/userRepository";
import { User } from "../../types/userTypes";

type props = {
  repository: UserRepository;
  id: string;
  user: Partial<User>;
};

export async function updateUser({ repository, id, user }: props) {
  const userExists = await repository.findById(id);

  if (userExists) {
    return await repository.update(id, user);
  } else {
    return new Error("User not found");
  }
}
