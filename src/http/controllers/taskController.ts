import { Request, Response } from "express"
import { createTask } from "../../app/use-cases/task/createTask"
import { findTaskByUser } from "../../app/use-cases/task/findTaskByUser"
import { PrismaTaskRepository } from "../../database/prisma/prismaTaskRepository"
import { TaskSchema } from "../../app/types/taskTypes"

const repository = new PrismaTaskRepository()

export async function create(req: Request, res: Response) {
    req.body.userId = req.sub
    const params = TaskSchema.parse(req.body)

    const { task } = await createTask({
        taskRepository: repository,
        task: params,
    })

    return res.status(201).json(task)
}

export async function findAllByUserId(req: Request, res: Response) {
    const tasks = await findTaskByUser({
        taskRepository: repository,
        userId: req.sub,
    })

    return res.status(200).json(tasks)
}
