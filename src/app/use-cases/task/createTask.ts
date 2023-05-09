import { TaskRepository } from "../../repositories/taskRepository";
import { Task } from "../../types/taskTypes";
import { TaskSchema } from "../../types/taskTypes";
import { ZodIssue } from "zod";

export async function createTask(
  taskRepository: TaskRepository,
  task: Task
): Promise<Task | ZodIssue[]> {
  const result = TaskSchema.safeParse(task);
  if (!result.success) {
    return result.error.issues;
  }
  return await taskRepository.create(result.data);
}
