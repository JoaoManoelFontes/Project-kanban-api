import { Request, Response } from "express";
import { PrismaUserRepository } from "../../database/prisma/prismaUserRepository";
import { createUser } from "../../app/use-cases/user/createUser";

export async function create(req: Request, res: Response) {
  const repository = new PrismaUserRepository();
  const user = await createUser(repository, req.body);

  return res.status(201).json(user);
}
