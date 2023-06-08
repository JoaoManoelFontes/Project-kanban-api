import { Request, Response } from "express"
import { createTask } from "../../app/use-cases/task/createTask"
import { PrismaTaskRepository } from "../../database/prisma/prismaTaskRepository"
import { ZodIssue } from "zod"

const taskRepository = new PrismaTaskRepository()

export async function create(req: Request, res: Response) {
    req.body.userId = req.sub

    const result = await createTask(taskRepository, req.body)

    if (result instanceof Array<ZodIssue>) {
        return res.status(400).json({ message: "Invalid data", issues: result })
    }

    return res.status(201).json(result)
}

export async function findAllByUserId(req: Request, res: Response) {
    const result = await taskRepository.findAllByUserId(req.sub)
    if (result instanceof Error) {
        return res
            .status(400)
            .json({ message: "Error", issues: result.message })
    }
    return res.status(200).json(result)
}
