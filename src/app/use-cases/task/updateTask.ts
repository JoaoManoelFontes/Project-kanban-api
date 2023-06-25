import { TaskRepository } from "../../repositories/taskRepository"
import { UpdateTask, Task } from "../../types/taskTypes"

interface updateTaskRequest {
    taskRepository: TaskRepository
    task: UpdateTask
    id: string
}

interface updateTaskResponse {
    updatedTask: Task
}

export async function updateTask({
    taskRepository,
    task,
    id,
}: updateTaskRequest): Promise<updateTaskResponse> {
    const { markAsDone, markAsMaking } = await taskRepository.findById(id)

    if (markAsDone && task.markAsMaking) task.markAsDone = false
    if (markAsMaking && task.markAsDone) task.markAsMaking = false

    const updatedTask = await taskRepository.update(id, task)
    return { updatedTask }
}
