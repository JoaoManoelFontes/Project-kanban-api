import { Task } from "../types/taskTypes"
import { v4 as uuidv4 } from "uuid"

type Override = Partial<Task>

export function createTaskFactory(overrides?: Override): Task {
    const task: Task = {
        id: uuidv4(),
        title: "Task title",
        content: "Task content",
        markAsMaking: false,
        markAsDone: false,
        userId: uuidv4(),
        ...overrides,
    }

    return task
}
