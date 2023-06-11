import { TaskRepository } from "../../repositories/taskRepository"
import { Task } from "../../types/taskTypes"

interface findTaskByUserRequest {
    taskRepository: TaskRepository
    userId: string
}

interface findTaskByUserResponse {
    tasks: Task[]
}

export async function findTaskByUser({
    taskRepository,
    userId,
}: findTaskByUserRequest): Promise<findTaskByUserResponse> {
    const tasks = await taskRepository.findAllByUserId(userId)
    return { tasks }
}
