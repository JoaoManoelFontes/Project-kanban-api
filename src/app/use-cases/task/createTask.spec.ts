import { expect, test } from "vitest"
import { InMemoryTaskRepository } from "../../../database/inMemory/inMemoryTaskRepository"
import { createTaskFactory } from "../../factories/createTaskFactory"
import { createTask } from "./createTask"

test("Should create a task", async () => {
    const repository = new InMemoryTaskRepository()
    const { task } = await createTask({
        taskRepository: repository,
        task: createTaskFactory(),
    })

    expect(task).toEqual(repository.tasks[0])
})
