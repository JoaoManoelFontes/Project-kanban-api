import { TaskRepository } from "../../repositories/taskRepository"
import { Task } from "../../types/taskTypes"

interface findTaskRequest {
    taskRepository: TaskRepository
    id: string
}

interface findTaskResponse {
    task: Task
}

export async function findTask({
    taskRepository,
    id,
}: findTaskRequest): Promise<findTaskResponse> {
    const task = await taskRepository.findById(id)
    return { task }
}
