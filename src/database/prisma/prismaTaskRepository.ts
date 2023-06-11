import { PrismaClient } from "@prisma/client"
import { TaskRepository } from "../../app/repositories/taskRepository"
import { Task } from "../../app/types/taskTypes"

const prisma = new PrismaClient()

export class PrismaTaskRepository extends TaskRepository {
    async create(task: Task): Promise<Task> {
        return await prisma.task.create({
            data: task,
        })
    }
    async update(id: string, task: Partial<Task>): Promise<Error | Task> {
        const updatedTask = await prisma.task.update({
            where: { id },
            data: task,
        })

        if (!updatedTask) return new Error("Task not found")
        return updatedTask
    }
    async delete(id: string): Promise<void | Error> {
        const deletedTask = await prisma.task.delete({
            where: { id },
        })

        if (!deletedTask) return new Error("Task not found")
    }
    async findById(id: string): Promise<Error | Task> {
        const task = await prisma.task.findUnique({
            where: { id },
        })

        if (!task) return new Error("Task not found")
        return task
    }

    async findAllByUserId(userId: string): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            where: { userId },
        })

        return tasks
    }
}
