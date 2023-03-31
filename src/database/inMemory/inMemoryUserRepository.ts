import { UserRepository } from "../../app/repositories/userRepository";
import { User } from "../../app/types/userTypes";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
