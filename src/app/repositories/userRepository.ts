import { User } from "../types/userTypes";

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
}
