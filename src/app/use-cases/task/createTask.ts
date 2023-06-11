import { TaskRepository } from "../../repositories/taskRepository"
import { Task } from "../../types/taskTypes"

interface createTaskRequest {
    taskRepository: TaskRepository
    task: Task
}

interface createTaskResponse {
    task: Task
}

export async function createTask({
    taskRepository,
    task,
}: createTaskRequest): Promise<createTaskResponse> {
    return { task: await taskRepository.create(task) }
}
