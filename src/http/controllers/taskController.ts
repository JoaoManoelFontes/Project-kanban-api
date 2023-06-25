import { NextFunction, Request, Response } from "express"
import { createTask } from "../../app/use-cases/task/createTask"
import { findTaskByUser } from "../../app/use-cases/task/findTaskByUser"
import { TaskSchema, UpdateTaskSchema } from "../../app/types/taskTypes"
import { updateTask } from "../../app/use-cases/task/updateTask"
import { findTask } from "../../app/use-cases/task/findTask"

import { PrismaTaskRepository } from "../../database/prisma/prismaTaskRepository"
const repository = new PrismaTaskRepository()

export async function create(req: Request, res: Response, next: NextFunction) {
    req.body.userId = req.sub
    const params = TaskSchema.parse(req.body)

    try {
        const { task } = await createTask({
            taskRepository: repository,
            task: params,
        })

        return res.status(201).send(task)
    } catch (err) {
        next(err)
    }
}

export async function list(req: Request, res: Response, next: NextFunction) {
    try {
        const { tasks } = await findTaskByUser({
            taskRepository: repository,
            userId: req.sub,
        })

        return res.status(200).send(tasks)
    } catch (err) {
        next(err)
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    req.body.userId = req.sub

    try {
        const params = UpdateTaskSchema.parse(req.body)
        const id = req.params.id
        const { updatedTask } = await updateTask({
            taskRepository: repository,
            task: params,
            id,
        })
        return res.status(200).send(updatedTask)
    } catch (err) {
        next(err)
    }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
    try {
        const { task } = await findTask({
            taskRepository: repository,
            id: req.params.id,
        })
        return res.status(200).send(task)
    } catch (err) {
        next(err)
    }
}
