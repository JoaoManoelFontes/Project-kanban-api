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
    async update(id: string, task: Partial<Task>): Promise<Task> {
        try {
            const updatedTask = await prisma.task.update({
                where: { id },
                data: task,
            })

            return updatedTask
        } catch (err) {
            console.log(err)
            throw new Error("Something went wrong in update task")
        }
    }
    async delete(id: string): Promise<void> {
        const deletedTask = await prisma.task.delete({
            where: { id },
        })

        if (!deletedTask) throw new Error("Task not found")
    }
    async findById(id: string): Promise<Task> {
        const task = await prisma.task.findUnique({
            where: { id },
        })

        if (!task) throw new Error("Task not found")
        return task
    }

    async findAllByUserId(userId: string): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            where: { userId },
        })

        return tasks
    }
}
