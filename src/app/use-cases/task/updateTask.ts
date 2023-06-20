import { TaskRepository } from "../../repositories/taskRepository"
import { UpdateTask, Task } from "../../types/taskTypes"

interface updateTaskRequest {
    taskRepository: TaskRepository
    task: UpdateTask
    id: string
}

interface updateTaskResponse {
    task: Task
}

export async function updateTask({
    taskRepository,
    task,
    id,
}: updateTaskRequest) {
    return await taskRepository.update(id, task)
}
