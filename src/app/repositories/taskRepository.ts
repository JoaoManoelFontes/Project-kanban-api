import { Task } from "../types/taskTypes"

export abstract class TaskRepository {
    abstract create(task: Task): Promise<Task>
    abstract update(id: string, task: Partial<Task>): Promise<Task | Error>
    abstract delete(id: string): Promise<void | Error>
    abstract findById(id: string): Promise<Task | Error>
    abstract findAllByUserId(userId: string): Promise<Task[]>
}
