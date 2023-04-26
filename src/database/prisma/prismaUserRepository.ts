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

  async delete(id: string): Promise<void | Error> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      await prisma.user.delete({
        where: {
          id,
        },
      });
    } else {
      return new Error("User not found");
    }
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return updatedUser;
  }

  async findById(id: string): Promise<User | Error> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return new Error("User not found");
    return user;
  }
}
