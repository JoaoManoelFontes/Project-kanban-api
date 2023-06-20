import { NextFunction, Request, Response } from "express"
import { createTask } from "../../app/use-cases/task/createTask"
import { findTaskByUser } from "../../app/use-cases/task/findTaskByUser"
import { PrismaTaskRepository } from "../../database/prisma/prismaTaskRepository"
import { TaskSchema, UpdateTaskSchema } from "../../app/types/taskTypes"
import { updateTask } from "../../app/use-cases/task/updateTask"

const repository = new PrismaTaskRepository()

export async function create(req: Request, res: Response, next: NextFunction) {
    req.body.userId = req.sub
    const params = TaskSchema.parse(req.body)

    try {
        const { task } = await createTask({
            taskRepository: repository,
            task: params,
        })

        return res.status(201).json(task)
    } catch (err) {
        next(err)
    }
}

export async function findAllByUserId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const tasks = await findTaskByUser({
            taskRepository: repository,
            userId: req.sub,
        })

        return res.status(200).json(tasks)
    } catch (err) {
        next(err)
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    req.body.userId = req.sub

    try {
        const params = UpdateTaskSchema.parse(req.body)
        const id = req.params.id
        const task = await updateTask({
            taskRepository: repository,
            task: params,
            id,
        })
        return res.status(200).json({ task })
    } catch (err) {
        next(err)
    }
}
