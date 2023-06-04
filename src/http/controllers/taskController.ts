import { Request, Response } from "express";
import { createTask } from "../../app/use-cases/task/createTask";
import { PrismaTaskRepository } from "../../database/prisma/prismaTaskRepository";

const taskRepository = new PrismaTaskRepository();

export async function create({ body }: Request, res: Response) {
  const result = await createTask(taskRepository, body);
  if (result instanceof Error) {
    return res.status(400).json({ message: result.message });
  }
  return res.status(201).json(result);
}

export async function findAllByUserId({ params }: Request, res: Response) {
  const result = await taskRepository.findAllByUserId(params.userId);
  if (result instanceof Error) {
    return res.status(400).json({ message: result.message });
  }
  return res.status(200).json(result);
}
