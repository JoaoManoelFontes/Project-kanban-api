import { Request, Response } from "express";
import { PrismaUserRepository } from "../../database/prisma/prismaUserRepository";
import { createUser } from "../../app/use-cases/user/createUser";
import { userLogin } from "../../app/use-cases/user/userLogin";
import { deleteUser } from "../../app/use-cases/user/deleteUser";
import { updateUser } from "../../app/use-cases/user/updateUser";

const repository = new PrismaUserRepository();

export async function create({ body }: Request, res: Response) {
  const user = await createUser(repository, body);

  if (Array.isArray(user)) {
    return res.status(400).json(user);
  }

  if (user instanceof Error) {
    return res.status(400).json({ error: user.message });
  }

  return res.status(201).json(user);
}

export async function login({ body }: Request, res: Response) {
  const user = await userLogin(repository, body);

  if (Array.isArray(user)) {
    return res.status(400).json(user);
  }

  if (user instanceof Error) {
    return res.status(400).json({ error: user.message });
  }
  return res.status(200).json(user);
}

export async function exclude({ body }: Request, res: Response) {
  const user = await deleteUser(repository, body.id);

  if (user instanceof Error) {
    return res.status(400).json({ error: user.message });
  }

  return res.status(204).json({ message: "User deleted" });
}

export async function update(req: Request, res: Response) {
  const user = await updateUser({
    repository,
    id: req.params.id,
    user: req.body,
  });

  if (user instanceof Error) {
    return res.status(400).json({ error: user.message });
  }

  return res.status(200).json(user);
}
