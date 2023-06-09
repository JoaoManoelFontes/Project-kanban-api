import { TaskRepository } from "../../app/repositories/taskRepository"
import { Task } from "../../app/types/taskTypes"

export class InMemoryTaskRepository extends TaskRepository {
    public tasks: Task[] = []

    async findAllByUserId(userId: string): Promise<Task[]> {
        const tasks = this.tasks.filter((task) => task.userId === userId)

        if (tasks.length === 0)
            throw new Error("Inexistent user id or tasks not found")
        return tasks
    }

    async create(task: Task): Promise<Task> {
        this.tasks.push(task)
        return task
    }

    async update(id: string, task: Partial<Task>): Promise<Task> {
        const index = this.tasks.findIndex((task) => task.id === id)
        if (index === -1) throw new Error("Task not found")

        this.tasks[index] = { ...this.tasks[index], ...task }
        return this.tasks[index]
    }

    async delete(id: string): Promise<void> {
        const index = this.tasks.findIndex((task) => task.id === id)
        if (index === -1) {
            throw new Error("Task not found")
        } else {
            this.tasks.splice(index, 1)
        }
    }

    async findById(id: string): Promise<Task> {
        const task = this.tasks.find((task) => task.id === id)

        if (!task) throw new Error("Task not found")
        return task
    }
}
