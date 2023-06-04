import { Request, Response } from "express"
import { createTask } from "../../app/use-cases/task/createTask"
import { PrismaTaskRepository } from "../../database/prisma/prismaTaskRepository"

const taskRepository = new PrismaTaskRepository()

export async function create(req: Request, res: Response) {
    req.body.userId = req.sub
    console.log(req.body)

    const result = await createTask(taskRepository, req.body)
    if (result instanceof Error) {
        return res.status(400).json({ message: result.message })
    }
    return res.status(201).json(result)
}

export async function findAllByUserId({ params }: Request, res: Response) {
    const result = await taskRepository.findAllByUserId(params.sub)
    if (result instanceof Error) {
        return res.status(400).json({ message: result.message })
    }
    return res.status(200).json(result)
}
