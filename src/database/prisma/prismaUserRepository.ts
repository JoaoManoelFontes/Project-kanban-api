import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../app/repositories/userRepository";
import { User } from "../../app/types/userTypes";

const prisma = new PrismaClient();
export class PrismaUserRepository extends UserRepository {
  async create(user: User): Promise<User> {
    const createUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return createUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
