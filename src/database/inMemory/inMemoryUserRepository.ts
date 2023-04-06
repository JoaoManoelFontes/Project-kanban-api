import { UserRepository } from "../../app/repositories/userRepository";
import { User } from "../../app/types/userTypes";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async delete(id: string): Promise<void | Error> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.users.splice(this.users.indexOf(user), 1);
    } else {
      return new Error("User not found");
    }
  }

  async update(id: String, user: Partial<User>): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}
