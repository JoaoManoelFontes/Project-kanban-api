import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../app/repositories/userRepository";
import { User } from "../../app/types/userTypes";
import { v4 as uuidv4 } from "uuid";

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
}
