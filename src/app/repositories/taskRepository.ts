import { Task } from "../types/taskTypes"

export abstract class TaskRepository {
    abstract create(task: Task): Promise<Task>
    abstract update(id: string, task: Partial<Task>): Promise<Task>
    abstract delete(id: string): Promise<void>
    abstract findById(id: string): Promise<Task>
    abstract findAllByUserId(userId: string): Promise<Task[]>
}
